const shouldIgnoreTsxFromUi = (file) => /^components\/ui\/.*\.tsx$/u.test(file);

const quoteArg = (value) => JSON.stringify(value);

export default {
  "*.{ts,tsx}": (files) => {
    const filtered = files.filter((file) => !shouldIgnoreTsxFromUi(file));

    if (filtered.length === 0) {
      return [];
    }

    const fileArgs = filtered.map(quoteArg).join(" ");

    return [`prettier --write ${fileArgs}`, `eslint --no-warn-ignored ${fileArgs}`];
  },
  "*.css": ["stylelint"],
};
