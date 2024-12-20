import globals from "globals";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    ...fixupConfigRules(
        compat.extends(
            "eslint:recommended",
            "plugin:@typescript-eslint/eslint-recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "eslint-config-prettier",
            "plugin:@typescript-eslint/strict",
            "plugin:react-hooks/recommended",
            "prettier"
        )
    ).map((config) => ({
        ...config,
        files: ["./src/**/*.ts"],
    })),
    {
        files: ["./src/**/*.ts"],

        plugins: {
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },

        rules: {
            "no-await-in-loop": "error",
            "no-constant-binary-expression": "error",
            "no-constructor-return": "error",
            "no-duplicate-imports": "warn",
            "no-self-compare": "warn",
            "no-template-curly-in-string": "warn",
            "no-unreachable-loop": "warn",
            "no-unused-private-class-members": "error",
            "require-atomic-updates": "warn",
            camelcase: "warn",
            "dot-notation": "warn",
            eqeqeq: "warn",
            "guard-for-in": "warn",
            "new-cap": "warn",
            "no-array-constructor": "warn",
            "no-caller": "error",
            "no-else-return": "warn",
            "no-eval": "error",
            "no-extra-bind": "warn",
            "no-implicit-coercion": "warn",
            "no-implied-eval": "error",
            "no-invalid-this": "error",
            "no-lonely-if": "warn",
            "no-new": "error",
            "no-new-object": "error",
            "no-new-wrappers": "error",
            "no-return-await": "warn",
            "no-script-url": "error",
            "no-throw-literal": "error",
            "no-unneeded-ternary": "warn",
            "no-unused-expressions": "warn",
            "no-useless-call": "warn",
            "no-useless-rename": "warn",
            "no-useless-return": "warn",
            "no-var": "error",
            "prefer-const": "warn",
            "prefer-destructuring": "warn",
            "prefer-object-spread": "warn",
            "prefer-regex-literals": "warn",
            "prefer-rest-params": "warn",
            "prefer-spread": "warn",
            "require-await": "error",
            "@typescript-eslint/no-non-null-assertion": "off",
            "no-unused-vars": "off",

            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/member-ordering": "warn",
            "@typescript-eslint/no-confusing-void-expression": "warn",
            "@typescript-eslint/restrict-template-expressions": "off",
            "@typescript-eslint/triple-slash-reference": "off",
        },
    },
];
