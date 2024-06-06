# React + TypeScript + Vite

setup eslint, prettier
yarn add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier -D

config
.prettierrc
.prettierignore
.eslintrc
.eslintignore
.editorconfig

sua package.json
...
,
"lint": "eslint --ext ts,tsx src/",
"lint:fix": "eslint --fix --ext ts,tsx src/",
"prettier": "prettier --check \"src/**/(_.tsx|_.ts|_.css|_.scss)\"",
"prettier:fix": "prettier --write \"src/**/(_.tsx|_.ts|_.css|_.scss)\""

install tailwind css
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

config tailwind.config.js
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

add index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

neu vscode bao loi linh tinh -> restart eslint
ctr shift p -> restart eslint

yarn add react-router-dom
