import Linter from "eslint4b";

const linter = new Linter();

export async function verify(code: string, filename?: string) {
  return linter
    .verify(
      code,
      {
        rules: {
          semi: "error",
          "no-unused-vars": "error",
        },
        env: {
          es6: true,
        },
      },
      filename
    )
    .map((err) => ({
      startLineNumber: err.line,
      endLineNumber: err.line,
      startColumn: err.column,
      endColumn: err.column,
      message: `${err.message} (${err.ruleId})`,
      severity: 3,
      source: "ESLint",
    }));
}
