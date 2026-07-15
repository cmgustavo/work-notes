module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  // react-redux ships untranspiled ESM and @react-navigation resolves to its
  // TypeScript sources, so both need transforming; the preset skips them.
  transformIgnorePatterns: [
    'node_modules/(?!(?:@react-native|react-native|@react-navigation|react-redux)/)',
  ],
};
