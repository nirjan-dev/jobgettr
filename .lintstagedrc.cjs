module.exports = {
  '*.{js,ts,md,html,css,vue}': [
    'stylelint "**/*.{css,scss,vue}" --fix',
    'prettier --write',
    'eslint --fix',
  ],
};
