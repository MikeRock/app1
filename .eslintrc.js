module.exports = {
  extends: [
    // 'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: 'babel-eslint',
  plugins: ['react', 'import', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        'tabWidth': 2,
        'jsxBracketSameLine': true,
        'printWidth': 130
      },
    ],
    'react/jsx-curly-spacing': [2, 'never', {
      allowMultiline: false
    }],
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-indent': [2, 2],
    'react/jsx-key': 2,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': [1, {
      ignore: ['children']
    }],
    'react/jsx-no-duplicate-props': [2, {
      ignoreCase: true
    }],
    'react/sort-prop-types': [
      2,
      {
        callbacksLast: true,
        ignoreCase: true,
        requiredFirst: false,
      },
    ],
    'no-duplicate-imports': [0],
    'dot-notation': 0,
    'no-underscore-dangle': 0,
    'jsx-a11y/label-has-for': 0,
    'import/no-duplicates': [2],
    // For React component omitted with webpack config
    'import/no-extraneous-dependencies': 0,
    'arrow-body-style': 0,
    'func-names': 0,
    'import/no-named-as-default': 0,
    'linebreak-style': 0,
    'no-case-declarations': 0,
    'no-else-return': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-bind': 0,
    'react/prefer-es6-class': 2,
    'react/jsx-max-props-per-line': [1, {
      maximum: 7
    }],
  },
};