import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChatPromptTemplate } from 'langchain/prompts';
import { BaseOutputParser } from 'langchain/schema/output_parser';
import { IResumeSuggestionsBody } from '~/types/IResumeSuggestionsBody';

let openAIApiKey: string;

export default defineEventHandler(
  async function resumeSuggestionsEndpoint(event) {
    const body = await readBody<IResumeSuggestionsBody>(event);
    const jobDescription = body.jobDescription;
    const skills = body.skills;
    const accomplishments = body.accomplishments;
    const apiKey = body.apiKey;

    openAIApiKey = apiKey;

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

    const additionalRecommendations = requiredSkills
      .filter(function getNonListedSkills(skill) {
        return !skills.includes(skill);
      })
      .slice(0, 5);

    const suggestedAccomplishments = await getAccomplishmentSuggestionsFromJD(
      jobDescription,
      accomplishments,
    );

    // enable this for testing
    // const { suggestedSkillsToEnable, additionalRecommendations } =
    //   getMockValues(skills);

    return {
      suggestedSkillsToEnable,
      additionalRecommendations,
      suggestedAccomplishments,
    };
  },
);

// function getMockValues(skills: string[]) {
//   const randomSkills = skills.filter(function getRandomSkill() { return  Math.random() < 0.5});

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
//     function getIncludedSkill(skill)  {
//       return skills.includes(skill);
//     },
//   );

//   const additionalRecommendations: string[] = recommendedSkills.filter(
//     function getNonIncludedSkill(skill)  {
//       return !skills.includes(skill);
//     },
//   );

//   return {
//     suggestedSkillsToEnable,
//     additionalRecommendations,
//   };
// }

async function getAccomplishmentSuggestionsFromJD(
  description: string,
  accomplishments: string[][],
) {
  const promises = accomplishments.map(
    function getAccomplishmentSuggestion(accomplishment) {
      return getAccomplishmentSuggestionFromOneSet(description, accomplishment);
    },
  );

  return await Promise.all(promises);
}

async function getAccomplishmentSuggestionFromOneSet(
  description: string,
  accomplishments: string[],
) {
  const template = `You are a hiring manager reviewing a candidate's resume. You will be given a list of job accomplishments to include in a resume and the job description for a role. Each accomplishment will only be separated by " --- ". Only include the accomplishments that are relevant to the role. Return a list of the relevant accomplishments. ONLY return a list separated by a " --- ", and nothing more. Return a maximum of 6 accomplishments. Never return an accomplishment that is not in the list.`;

  const humanTemplate = '{accomplishments} {jobDescription}';

  const parser = new DashSeparatedListOutputParser();

  const chain = createLangChain(template, humanTemplate, parser);

  return await chain.invoke({
    accomplishments: accomplishments.join(' --- '),
    jobDescription: description,
  });
}

async function getRequiredSkillsFromJD(description: string) {
  const template = `You are a recruiter helping developers find jobs. A user will pass in a description, and you should extract the most relevant required technical skills from the description in a comma separated list. ONLY return a comma separated list, and nothing more. Only extract a maximum of 15 skills.`;

  const humanTemplate = '{description}';

  const chain = createLangChain(template, humanTemplate);

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

  const chain = createLangChain(template, humanTemplate);

  return await chain.invoke({
    currentSkills: currentSkills.join(','),
    requiredSkills: requiredSkills.join(','),
  });
}

function createLangChain(
  systemTemplate: string,
  humanTemplate: string,
  parser?: BaseOutputParser<string[]>,
) {
  /**
   * Chat prompt for generating comma-separated lists. It combines the system
   * template and the human template.
   */
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['human', humanTemplate],
  ]);

  const model = new ChatOpenAI({
    maxTokens: 1000,
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    // verbose: true,
    openAIApiKey,
  });
  parser = parser || new CommaSeparatedListOutputParser();

  return chatPrompt.pipe(model).pipe(parser);
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

class DashSeparatedListOutputParser extends BaseOutputParser<string[]> {
  getFormatInstructions(): string {
    throw new Error('Method not implemented.');
  }

  async parse(text: string): Promise<string[]> {
    return await text.split(' --- ').map(function trimItem(item) {
      return item.trim();
    });
  }
}
