import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tailwindcss from "eslint-plugin-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tailwindcss.configs["flat/recommended"],
  globalIgnores([
    ".next/**",
    ".github/**",
    ".husky/**",
    ".vscode/**",
    "assets/**",
    "components/**",
    "public/**",
    "build/**",
    "node_modules/**",
    "package.json",
    "package-lock.json",
    ".editorconfig",
    ".gitignore",
    ".prettierignore",
    ".prettierrc.json",
    ".releaserc.json",
    "CHANGELOG.md",
    "README.md",
    "LICENSE",
    "components.json",
    "next-env.d.ts",
    "tsconfig.json",
    "tsconfig.tsbuildinfo",
  ]),
  {
    settings: {
      tailwindcss: {
        config: {},
      },
    },
  },
  prettierRecommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "tailwindcss/no-custom-classname": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
