module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-unused-vars": "warn", // Cảnh báo nếu biến không được sử dụng
    "import/no-unresolved": "error", // Báo lỗi nếu import không hợp lệ
    "import/named": "error", // Báo lỗi nếu import không đúng tên
    "import/namespace": "error", // Báo lỗi nếu import không đúng namespace
    "import/default": "error", // Báo lỗi nếu import không đúng default
    "import/export": "error", // Báo lỗi nếu export không hợp lệ
  },
};
