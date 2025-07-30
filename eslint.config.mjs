import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import { globalIgnores } from "@eslint/config-helpers";
import stylistic from "@stylistic/eslint-plugin";
import { fileURLToPath, URL } from "node:url";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default tseslint.config(
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  globalIgnores(["build.ts"], "Ignore build script"),

  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    plugins: {
      "@stylistic": stylistic,
    },
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    // ESLint
    rules: {},
  },
  // TypeScript
  {
    rules: {
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-empty-function": "off",
    },
  },
  // Stylistic
  {
    rules: {},
  }
);
