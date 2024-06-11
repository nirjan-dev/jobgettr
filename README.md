# Job Gettr app

This is a job application tracking app which has the following features

- Track all the job openings that you've applied for
- Create custom resumes for each job
- Use AI to get recommendations to improve your resume for each job based on the job description (requires an OpenAI API key)
- Keep track of a list of skills you want to learn to improve your career prospects and how many times those skills show up on jobs you're applying to. This could help you prioritize what to learn first.

All the data is stored locally on your browser so nothing is sent to the server (including your OpenAI API key). This does mean there is no syncing across browsers and devices at the moment (this is a planned feature for the future.)

## Technologies used

- Nuxt 3
- Vue 3
- Naive UI
- Pinia
- Langchain.js
- Puppeteer

## Getting started

- clone the project locally
- make sure you're using the same version of node that's specified in the .nvmrc file
- install the dependencies with npm install
- run the app with npm run dev

## deployment

Most of the app is just a single page application that uses Nuxt so it should run in most places and even with SSG, however, the resume download button requires a server endpoint which uses puppeteer to create a resume pdf and downloads it. So, if you want that feature then you either need a full node server or you can deploy it to a provider that supports serverless functions (tested successfully on vercel). Here is a [live version of the app](https://jobgettr.vercel.app/) running on vercel.
