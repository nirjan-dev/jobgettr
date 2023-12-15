<template>
  <div>
    <div
      class="mx-4 max-w-md rounded-md bg-white px-8 py-6 shadow-sm md:mx-auto"
    >
      <h1 class="mb-2 text-3xl">Login</h1>
      <p class="text-lg opacity-80">Access your account now</p>

      <NForm
        ref="formRef"
        :model="formModel"
        :rules="rules"
      >
        <NFormItem
          label="Email"
          path="email"
        >
          <NInput v-model:value="formModel.email"></NInput>
        </NFormItem>

        <NFormItem
          label="Password"
          path="password"
        >
          <NInput
            v-model:value="formModel.password"
            type="password"
          ></NInput>
        </NFormItem>

        <NButton
          :loading="isSubmitting"
          type="success"
          :block="true"
          @click="handleFormSubmit"
          >Login</NButton
        >

        <NButton
          class="mt-4"
          type="default"
          :block="true"
        >
          <a href="/api/login/github">Continue with Github</a>
        </NButton>

        <NButton
          class="mt-4"
          type="default"
          :block="true"
        >
          <a href="/api/login/google">Continue with Google</a>
        </NButton>

        <p class="my-8 text-base">
          Don't have an account?
          <nuxt-link
            class="font-bold"
            to="/signup"
            >Sign up now</nuxt-link
          >
        </p>
      </NForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    FormInst,
    FormRules,
    NButton,
    NForm,
    NFormItem,
    NInput,
    useMessage,
  } from 'naive-ui';

  definePageMeta({
    middleware: ['redirect-logged-in'],
  });

  const router = useRouter();

  const isSubmitting = ref(false);
  const formModel = ref({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const message = useMessage();

  const formRef = ref<FormInst | null>(null);
  const rules: FormRules = {
    email: {
      required: true,
      type: 'email',
      trigger: ['input', 'blur'],
    },
    password: {
      required: true,
      trigger: ['input', 'blur'],
    },
  };

  function handleFormSubmit() {
    formRef.value?.validate(async function onValidation(errors) {
      if (errors) {
        message.error('Please fill in all required fields');
      }

      isSubmitting.value = true;
      await loginUser();
      isSubmitting.value = false;
    });
  }

  async function loginUser() {
    try {
      await $fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(formModel.value),
      });

      message.success('Login successful');
      router.push('/apply');
    } catch (error) {
      console.log({ error });
      message.error('Something went wrong, please try again');
    }
  }
</script>
