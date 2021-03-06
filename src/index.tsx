import { h, render } from "preact";
import "normalize.css";
import { useState, useMemo } from "preact/hooks";
import { glob, setPragma, styled } from "goober";
import * as monaco from "monaco-editor";
import Editor from "./components/Editor";
import SideNav from "./components/SideNav";

setPragma(h);

glob`
  body {
    height: 100vh;
    width: 100vw;
  }
`;

const Container = styled("div")`
  display: flex;
  height: 100%;
`;

export const prettierrcUri = monaco.Uri.from({
  scheme: "file",
  path: "/.prettierrc.json",
});

const initialModels: monaco.editor.ITextModel[] = [
  monaco.editor.createModel(
    `import { foo } from "./foo";
console.log(foo);
`,
    "typescript",
    monaco.Uri.from({
      scheme: "file",
      path: "/index.ts",
    })
  ),
  monaco.editor.createModel(
    `export const foo = { key: "value" };
`,
    "typescript",
    monaco.Uri.from({
      scheme: "file",
      path: "/foo.ts",
    })
  ),
  monaco.editor.createModel(`{ "singleQuote": false }`, "json", prettierrcUri),
];

const App = () => {
  const [models, setModels] = useState<monaco.editor.ITextModel[]>(
    initialModels
  );
  const [modelIdx, setModelIdx] = useState(0);
  const model = useMemo(() => models[modelIdx] || null, [models, modelIdx]);
  return (
    <Container>
      <SideNav models={models} modelIdx={modelIdx} setModelIdx={setModelIdx} />
      <Editor
        model={model}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </Container>
  );
};

render(<App />, document.body);
