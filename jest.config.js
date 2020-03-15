module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  testMatch: [
    'test/**/*.spec.js',
    '**/*.spec.js',
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
};
