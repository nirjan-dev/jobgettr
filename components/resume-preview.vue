<template>
  <div class="max-w-screen-lg mx-auto p-8">
    <div class="grid gap-2 mb-6">
      <h2 class="text-5xl font-bold text-center">Nirjan Kahdka</h2>
      <h3 class="text-center text-2xl">Full-Stack Developer</h3>
      <ul class="flex flex-wrap justify-center gap-2">
        <li>
          <a href="mailto:webdev.nk@gmail.com">webdev.nk@gmail.com</a>
        </li>
        <li>
          <a href="https://linkedin.com/in/nirjankhadka/">LinkedIn</a>
        </li>
        <li><a href="https://gitbub.com/nirjan-dev/">Github</a></li>
        <li><a href="https://twitter.com/nirjan_dev">twitter</a></li>
        <li><a href="https://nirjan.dev">Personal Site</a></li>
      </ul>
    </div>

    <div class="grid gap-4">
      <section>
        <h3>Summary</h3>
        <p>
          Self-taught web developer with 5+ years of experience in building and
          delivering high-quality web applications. Comfortable working in a
          fast-paced remote team and constantly learning new technologies.
          Passionate about building software that helps people improve their
          lives.
        </p>
      </section>
      <section>
        <h3>Skills</h3>
        <ul>
          <li>Vue</li>
          <li>CSS</li>
          <li>TypeScript</li>
          <li>Nuxt.js</li>
          <li>Tailwind CSS</li>
          <li>Google Cloud Platform</li>
          <li>SQL</li>
          <li>OpenAI</li>
          <li>JavaScript</li>
          <li>PostgresSQL</li>
        </ul>
      </section>
      <section>
        <h3>Experience</h3>
        <h4>Full-Stack Developer</h4>
        <h5>OpenAI</h5>
        <h6>2021 - Present</h6>
        <ul>
          <li>
            Worked on the OpenAI Codex Playground, a web application that
            demonstrates the capabilities of OpenAI Codex.
          </li>
          <li>
            Built the OpenAI Codex Playground using Vue, TypeScript, and
            Tailwind CSS.
          </li>
          <li>
            Worked on the OpenAI Codex Playground, a web application that
            demonstrates the capabilities of OpenAI Codex.
          </li>
          <li>
            Built the OpenAI Codex Playground using Vue, TypeScript, and
            Tailwind CSS.
          </li>
        </ul>
      </section>
      <section>
        <h3>Experience</h3>
        <h4>Full-Stack Developer</h4>
        <h5>OpenAI</h5>
        <h6>2021 - Present</h6>
        <ul>
          <li>
            Worked on the OpenAI Codex Playground, a web application that
            demonstrates the capabilities of OpenAI Codex.
          </li>
          <li>
            Built the OpenAI Codex Playground using Vue, TypeScript, and
            Tailwind CSS.
          </li>
          <li>
            Worked on the OpenAI Codex Playground, a web application that
            demonstrates the capabilities of OpenAI Codex.
          </li>
          <li>
            Built the OpenAI Codex Playground using Vue, TypeScript, and
            Tailwind CSS.
          </li>
        </ul>
      </section>
      <section>
        <h3>Projects</h3>
        <article>
          <h4><a href="https://remotedevjobs.net">remotedevjobs.net</a></h4>
          <h5>Job Board Site to find remote tech jobs</h5>
          <h5>
            Technologies: Nuxt.js, Typescript, TailwindCSS, OpenAI, Prisma
          </h5>
        </article>
        <article>
          <h4><a href="https://remotedevjobs.net">remotedevjobs.net</a></h4>
          <h5>Job Board Site to find remote tech jobs</h5>
          <h5>
            Technologies: Nuxt.js, Typescript, TailwindCSS, OpenAI, Prisma
          </h5>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
a {
  @apply text-blue-500;
}

h3 {
  @apply text-2xl font-bold mb-2;
}

section h3:after {
  content: "";
  @apply block  h-0.5 bg-gray-500;
}

section li {
  @apply mb-1 list-disc;
}
</style>
