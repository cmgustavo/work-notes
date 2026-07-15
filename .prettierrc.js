module.exports = {
  bracketSpacing: false,
  bracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  // core.autocrlf checks these files out with CRLF on Windows; keep Prettier
  // from flagging every line while git still stores LF.
  endOfLine: 'auto',
};
