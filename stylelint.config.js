module.exports = {
  ignoreFiles: ['**/*.js', '**/*.md', '**/*.ts', '**/*.tsx'],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'selector-class-pattern':
      '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$', // 允许BEM命名格式
    'comment-empty-line-before': null, // 要求或禁止在注释之前有空行
    'function-name-case': ['lower', { ignoreFunctions: ['/colorPalette/'] }], // 指定函数名称的大小写,当使用 lower 选项时，函数名称使用驼峰式大小写，如 translateX。
    'no-invalid-double-slash-comments': null, // 禁用 CSS 不支持的双斜线注释
    'no-descending-specificity': null, // 禁止低优先级的选择器出现在高优先级的选择器之后
    'no-invalid-position-at-import-rule': null,
    'declaration-empty-line-before': null, // 要求或禁止在声明语句之前有空行
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
  },
};
