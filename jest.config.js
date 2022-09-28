module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '.*.tsx?$': 'ts-jest',
  },
  testRegex: '(/_test_/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['node_modules'],
}
