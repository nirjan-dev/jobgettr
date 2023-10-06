module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:sonarjs/recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:@getify/proper-arrows/getify-says',
    'plugin:security/recommended',
  ],
  plugins: [
    'sonarjs',
    'promise',
    'pure',
    'no-loops',
    'write-good-comments',
    'no-secrets',
  ],
  rules: {
    'no-loops/no-loops': 2,
    'write-good-comments/write-good-comments': 'warn',
    'no-secrets/no-secrets': 'error',
    'func-names': ['error', 'as-needed'],
  },
};
