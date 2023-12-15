<template>
  <div>
    <div
      class="mx-4 max-w-md rounded-md bg-white px-8 py-6 shadow-sm md:mx-auto"
    >
      <h1 class="mb-2 text-3xl">Get Started</h1>
      <p class="text-lg opacity-80">Create your account now</p>

      <NForm
        ref="formRef"
        :model="formModel"
        :rules="rules"
        @submit="handleFormSubmit"
      >
        <NFormItem
          label="Email"
          path="email"
        >
          <NInput v-model:value="formModel.email"></NInput>
        </NFormItem>

        <NFormItem
          label="Name"
          path="name"
        >
          <NInput
            v-model:value="formModel.name"
            type="text"
          ></NInput>
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

        <NFormItem
          label="Confirm Password"
          path="confirmPassword"
        >
          <NInput
            v-model:value="formModel.confirmPassword"
            type="password"
          />
        </NFormItem>

        <NButton
          type="success"
          :block="true"
          :loading="isSubmitting"
          @click="handleFormSubmit"
          >Sign Up</NButton
        >

        <p class="my-8 text-base">
          Already have an account?
          <nuxt-link
            class="font-bold"
            to="/login"
            >Login</nuxt-link
          >
        </p>
      </NForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    FormInst,
    FormItemRule,
    FormRules,
    NButton,
    NForm,
    NFormItem,
    NInput,
    useMessage,
  } from 'naive-ui';

  const message = useMessage();
  const formModel = ref({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const isSubmitting = ref(false);

  const formRef: Ref<FormInst | null> = ref(null);

  const rules: FormRules = {
    email: {
      required: true,
      type: 'email',
      trigger: ['input', 'blur'],
    },
    name: {
      required: true,
      trigger: ['input', 'blur'],
    },
    password: {
      required: true,
      min: 6,
      trigger: ['input', 'blur'],
    },
    confirmPassword: {
      required: true,
      trigger: ['input', 'blur'],

      validator: function (_rule: FormItemRule, value: string) {
        return value === formModel.value.password
          ? true
          : Error("Passwords don't match");
      },
    },
  };

  function handleFormSubmit() {
    formRef.value?.validate(async function onValidation(errors) {
      if (errors) {
        message.error('Please fill in all required fields');
      }

      isSubmitting.value = true;
      await signUpUser();
      isSubmitting.value = false;
    });
  }

  async function signUpUser() {
    // const { error } = await supabaseClient.auth.signUp({
    //   email: formModel.value.email,
    //   password: formModel.value.password,
    // });

    let user, userCreationError;

    try {
      const { response } = await $fetch('/api/signup', {
        method: 'POST',
        body: formModel.value,
      });
      user = response;
    } catch (error) {
      userCreationError = error;
    }

    if (userCreationError) {
      message.error(
        'Something went wrong with the signup. Please try again later',
      );
      return;
    }

    if (user) {
      message.success(
        'Signup successful, please check your email to confirm your account.',
      );
    }
  }
</script>
