module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  globals: {
    atom: true
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["lib"],
        extensions: [".js", ".jsx", ".json"]
      }
    },
    "import/core-modules": ["atom"]
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  plugins: ["import", "react"],
  rules: {
    "no-dupe-keys": 2,
    "no-undef": 2,
    "no-unreachable": 2,
    "no-unused-vars": [2, { argsIgnorePattern: "^_" }],
    "no-useless-constructor": 2,
    "no-var": 2,
    "no-duplicate-imports": 2,
    "no-duplicate-case": 2,
    "import/no-unresolved": 2,
    "import/default": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-uses-vars": 1,
    "react/jsx-uses-react": "error",
    "react/react-in-jsx-scope": 2,
    "react/no-string-refs": 2,
    "react/prop-types": [2, { skipUndeclared: true }],
    "react/forbid-prop-types": 2,
    "react/prefer-stateless-function": 2,
    "no-console": "error",
    "no-debugger": "error"
  }
};
