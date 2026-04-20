// @ts-check

import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import { config } from './my-config.js'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'

const a = defineConfig([
  {
    files: [...config.sourceExtensions.map(v => 'src/**/*' + v), "*.ts"],
    extends: [
      js.configs.recommended, // https://typescript-eslint.io/getting-started, https://www.npmjs.com/package/@eslint/js

      // ************ https://typescript-eslint.io/getting-started, https://typescript-eslint.io/packages/typescript-eslint#flat-config-extends
      tseslint.configs.base,
      // "recommded" includes files by default which we dont want to merge with our defined files (defineConfig merges two files arrays)
      {
        ...tseslint.configs.recommended[1], // recommded = [base, recommended]
        files: [],
      },
      tseslint.configs.strict[2], // "strict" = [base, recommended, strict]
      tseslint.configs.stylistic[2], // "stylistic" = [base, recommended, stylistic]
      // *************

      reactHooks.configs.flat.recommended, // https://www.npmjs.com/package/eslint-plugin-react-hooks
      // stylistic.configs.recommended, // https://eslint.style/rules
    ],
    plugins: {
      '@stylistic': stylistic, // https://eslint.style/rules
    },
    rules: {
      '@stylistic/nonblock-statement-body-position': ['warn', 'below'], // https://eslint.style/rules
      "@stylistic/semi": ["warn", "always"],
      '@typescript-eslint/no-unused-vars': ['warn']
    },
    languageOptions: {
      globals: {
        process: 'readonly',
        JSX: 'readonly',
      },
    },
  },
])

export default a
