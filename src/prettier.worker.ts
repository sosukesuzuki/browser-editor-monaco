import prettier from "prettier/standalone";
import typescript from "prettier/parser-typescript";

type Promisify<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;

let p: typeof prettier | null = null;
let ts: typeof typescript | null = null;

async function installPackages(): Promise<void> {
  const [p1, p2] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/parser-typescript"),
  ]);
  p = p1.default || p1;
  ts = p2.default || p2;
}
export const format: Promisify<typeof prettier.format> = async function (
  value,
  options
) {
  if (!p || !ts) {
    await installPackages();
  }
  // @ts-ignore
  return p.format(value, {
    ...options,
    parser: "typescript",
    // @ts-expect-error
    plugins: [ts],
  });
};
