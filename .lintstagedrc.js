module.exports = {
  '*.{ts,tsx}': ['npm run lint:fix', 'prettier --write'],
  '*.{js,jsx}': ['prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
