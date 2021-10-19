module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'vue/singleline-html-element-content-newline': [0, 'never'], // 在单行元素的内容之前和之后需要换行
    'vue/max-attributes-per-line': [0, 'never'], // 每行的最大属性数
    'vue/html-self-closing': [0, 'never'], // 自我封闭的风格标签
    'comma-dangle': ['error', 'always-multiline'], // 对象后要加逗号
    semi: ['error', 'always'], // 强制分号
    quotes: ['error', 'single'], // 强制使用单引号
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true,
      },
    ], //  强制对象文字属性中的键和值之间保持一致的间距
    'space-infix-ops': 2, // 要求在运算符之间加空格
    '@typescript-eslint/no-var-requires': 'off',
    'no-undef': 'off', // vue文件识别不到命名空间
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
