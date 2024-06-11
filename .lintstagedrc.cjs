module.exports = {
  '*.{vue,css,scss}': ['stylelint "**/*.{css,scss,vue}" --fix'],
  '*.{js,ts,html,css,vue}': ['prettier --write', 'eslint --fix'],
};
