module.exports = {
  extends: [
    "formidable/configurations/es6-react",
    "prettier",
    "prettier/flowtype",
    "prettier/react"
  ],
  plugins: ["react"],
  rules: {
    "react/prop-types": 0,
    "no-invalid-this": 0,
    "no-console": 0,
    "no-magic-numbers": 0,
    "consistent-return": 0,
    "react/sort-comp": [
      1,
      {
        order: [
          "static-methods",
          "everything-else",
          "/^on.+$/",
          "lifecycle",
          "render"
        ]
      }
    ]
  }
};
