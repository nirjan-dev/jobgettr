<template>
  <div class="mx-auto py-2 px-6">
    <div class="grid">
      <h2 class="text-4xl font-bold text-center">Nirjan Khadka</h2>
      <h3 class="text-center text-xl">{{ resume.role }}</h3>
      <ul class="flex flex-wrap justify-center gap-4">
        <li>
          <a href="tel:+9779862437547">+977 9862437547</a>
        </li>
        <li>Kathmandu, Nepal</li>
      </ul>
      <ul class="flex flex-wrap justify-center gap-4">
        <li>
          <a href="mailto:webdev.nk@gmail.com"> webdev.nk@gmail.com</a>
        </li>
        <li><a href="https://nirjan.dev">nirjan.dev</a></li>
        <li>
          <a href="https://linkedin.com/in/nirjankhadka/"
            >https://linkedin.com/in/nirjankhadka</a
          >
        </li>
        <li>
          <a href="https://twitter.com/nirjan_dev"
            >https://twitter.com/nirjan_dev</a
          >
        </li>
        <li>
          <a href="https://gitbub.com/nirjan-dev/"
            >https://gitbub.com/nirjan-dev/</a
          >
        </li>
      </ul>
    </div>

    <div class="grid gap-2">
      <section class="grid gap-1">
        <h3>Summary</h3>
        <p>
          Self-taught web developer with 5+ years of experience in building and
          delivering high-quality web applications. Comfortable working in a
          fast-paced remote team and constantly learning new technologies.
          Passionate about building software that helps people improve their
          lives.
        </p>
      </section>
      <section class="grid gap-1">
        <h3>Skills</h3>
        <ul class="flex flex-wrap gap-5" v-if="resume?.skills?.length > 0">
          <template v-for="skill in enabledSkills" :key="skill.title">
            <li :v-if="skill.enabled">
              {{ skill.title }}
            </li>
          </template>
        </ul>
      </section>
      <section class="grid gap-1">
        <h3>Work Experience</h3>

        <article>
          <h4 class="text-xl">
            {{ resume.role }}
            <span class="text-base float-right">Dec 2021 - Present</span>
          </h4>
          <h5 class="text-lg">Gfinity PLC</h5>

          <ul v-if="enabledFirstJobAccomplishments?.length > 0">
            <li
              v-for="accomplishment in enabledFirstJobAccomplishments"
              :key="accomplishment"
            >
              {{ accomplishment }}
            </li>
          </ul>
        </article>

        <article>
          <h4 class="text-xl">
            Frontend Developer
            <span class="text-base float-right"
              >Aug 2019 - Dec 2021, 2yrs 4mos</span
            >
          </h4>
          <h5 class="text-lg">Ensue LLC</h5>
          <ul v-if="enabledSecondJobAccomplishments?.length > 0">
            <li
              v-for="accomplishment in enabledSecondJobAccomplishments"
              :key="accomplishment"
            >
              {{ accomplishment }}
            </li>
          </ul>
        </article>
      </section>
      <section class="grid gap-1">
        <h3>Projects</h3>
        <article class="grid">
          <h4 class="text-xl">
            <a href="https://remotedevjobs.net">remotedevjobs.net</a>
          </h4>
          <h5 class="font-normal">Job Board Site to find remote tech jobs</h5>
        </article>

        <article class="grid">
          <h4 class="text-xl">
            <a href="https://nirjan.dev">nirjan.dev</a>
          </h4>
          <h5 class="font-normal">Personal Site & Blog</h5>
        </article>

        <article class="grid">
          <h4 class="text-xl">
            <a
              href="https://play.google.com/store/apps/details?id=com.nirjan.smartspend"
              >SmartSpend</a
            >
          </h4>
          <h5 class="font-normal">Android Purchase Planning App</h5>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResumePreviewStore } from "~/store/resumePreviewStore";

const { resumePreview: resume } = useResumePreviewStore();

const enabledFirstJobAccomplishments = computed(() =>
  resume.jobs?.[0]?.accomplishments.filter((a) => a.enabled).map((a) => a.title)
);

const enabledSecondJobAccomplishments = computed(() =>
  resume.jobs?.[1]?.accomplishments.filter((a) => a.enabled).map((a) => a.title)
);

const enabledSkills = computed(() => {
  return resume.skills?.filter((s) => s.enabled);
});
</script>

<style scoped>
a {
  @apply text-blue-500;
}

h3 {
  @apply text-2xl font-bold mb-2;
}

section h3 {
  border-bottom: 2px solid;
  @apply border-gray-300 pb-2;
}

section li {
  @apply mb-1 list-disc;
}
</style>
