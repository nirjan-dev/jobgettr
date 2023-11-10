import { IResume } from 'types/IResume';

// eslint-disable-next-line max-lines-per-function
export function getDefaultResume(): IResume {
  return {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '+5551234',
    skills: [
      'HTML',
      'CSS',
      'ChatGPT',
      'Figma',
      'PHP',
      'Wordpress',
      'React',
      'Vue',
      'Node',
    ],
    jobs: [
      {
        companyName: 'Google',
        startDate: 'Jan 2021',
        endDate: 'Present',
        role: 'Software Developer',
        useMainRole: true,
        accomplishments: [
          {
            title: 'Built a chatbot to increase productivity by 100%',
          },
          {
            title: 'Added an automation to save 1000 hours of work per year',
          },
          {
            title: 'Redesigned the website to increase conversion by 50%',
          },
        ],
      },
      {
        companyName: 'Facebook',
        startDate: 'Jan 2020',
        endDate: 'Jan 2021',
        role: 'Software Engineer',
        useMainRole: false,
        accomplishments: [
          {
            title: 'Built a chatbot to increase productivity by 100%',
          },
          {
            title: 'Added an automation to save 1000 hours of work per year',
          },
          {
            title: 'Redesigned the website to increase conversion by 50%',
          },
        ],
      },
    ],
    summary:
      'I am a software engineer with 5 years of experience in building web applications. I am passionate about building products that help people.',
    role: 'Software Engineer',
    links: [
      {
        title: 'LinkedIn',
        link: 'https://linkedin.com/in/johndoe',
      },
      {
        title: 'Github',
        link: 'https://github.com/johndoe',
      },
    ],
    location: 'Florida, USA',
    projects: [
      {
        title: 'My Awesome Blog',
        description: 'This is a project I built',
        link: 'https://nijan.dev',
      },
    ],
  };
}
