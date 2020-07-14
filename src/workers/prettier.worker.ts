import prettier from "prettier/standalone";
import typescript from "prettier/parser-typescript";
import { Options } from "prettier";

export async function format(value: string, options: Options) {
  return prettier.format(value, {
    ...options,
    parser: "typescript",
    plugins: [typescript],
  });
}
