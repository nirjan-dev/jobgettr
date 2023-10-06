import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChatPromptTemplate } from 'langchain/prompts';
import { BaseOutputParser } from 'langchain/schema/output_parser';

export default defineEventHandler(
  async function resumeSuggestionsEndpoint(event) {
    const { url } = getQuery(event);
    const body = await readBody(event);
    const jobDescription = body.jobDescription;
    const skills = body.skills;

    const requiredSkills = await getRequiredSkillsFromJD(jobDescription);

    const skillsRecommendations = await getSkillsSuggestions(
      requiredSkills,
      skills,
    );

    const suggestedSkillsToEnable = skillsRecommendations.filter(
      function getOnlyListedSkills(skill) {
        return skills.includes(skill);
      },
    );

    const additionalRecommendations = skillsRecommendations.filter(
      function getNonListedSkills(skill) {
        return !skills.includes(skill);
      },
    );

    // enable this for testing
    // const { suggestedSkillsToEnable, additionalRecommendations } =
    //   getMockValues(skills);

    return {
      suggestedSkillsToEnable,
      additionalRecommendations,
      url,
      jobDescription,
    };
  },
);

// function getMockValues(skills: string[]) {
//   const randomSkills = skills.filter((skill: string) => Math.random() < 0.5);

//   const recommendedSkills: string[] = [
//     ...randomSkills,
//     'GraphQL',
//     'Python',
//     'Flask',
//     'SQL Alchemy',
//     'Drizzle ORM',
//     'AppWrite',
//     'Svelte',
//     'Kotlin',
//     'Spring Boot',
//   ];

//   const suggestedSkillsToEnable: string[] = recommendedSkills.filter(
//     (skill) => {
//       return skills.includes(skill);
//     },
//   );

//   const additionalRecommendations: string[] = recommendedSkills.filter(
//     (skill) => {
//       return !skills.includes(skill);
//     },
//   );

//   return {
//     suggestedSkillsToEnable,
//     additionalRecommendations,
//   };
// }

async function getRequiredSkillsFromJD(description: string) {
  const template = `You are a recruiter helping developers find jobs. A user will pass in a description, and you should extract the most relevant required technical skills from the description in a comma separated list. ONLY return a comma separated list, and nothing more. Only extract a maximum of 15 skills.`;

  const humanTemplate = '{description}';

  /**
   * Chat prompt for generating comma-separated lists. It combines the system
   * template and the human template.
   */
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', template],
    ['human', humanTemplate],
  ]);

  const model = new ChatOpenAI({
    maxTokens: 1000,
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  });
  const parser = new CommaSeparatedListOutputParser();

  const chain = chatPrompt.pipe(model).pipe(parser);

  return await chain.invoke({
    description,
  });
}

async function getSkillsSuggestions(
  requiredSkills: string[],
  currentSkills: string[],
) {
  const template = `You are a tech recruiter. The user will pass you a currentSkills list and a requiredSkills list. Your task is to pick the items from the currentSkills list that match the requiredSkills list the most. Put the best matching skills at the top. You should return a comma separated list of the best matching skills from the currentSkills list. ONLY return a comma separated list, and nothing more. Only return a maximum of 15 skills. Never return a skill that is not in the currentSkills list.`;

  const humanTemplate = '{currentSkills} {requiredSkills}';

  /**
   * Chat prompt for generating comma-separated lists. It combines the system
   * template and the human template.
   */
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', template],
    ['human', humanTemplate],
  ]);

  const model = new ChatOpenAI({
    maxTokens: 1000,
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  });
  const parser = new CommaSeparatedListOutputParser();

  const chain = chatPrompt.pipe(model).pipe(parser);

  return await chain.invoke({
    currentSkills: currentSkills.join(','),
    requiredSkills: requiredSkills.join(','),
  });
}

class CommaSeparatedListOutputParser extends BaseOutputParser<string[]> {
  getFormatInstructions(): string {
    throw new Error('Method not implemented.');
  }

  async parse(text: string): Promise<string[]> {
    return await text.split(',').map(function trimItem(item) {
      return item.trim();
    });
  }
}
