import { h, render } from "preact";
import { glob } from "goober";
import Editor from "./components/Editor";

glob`
  body {
    height: 100vh;
    width: 100vw;
  }
`;

const App = () => (
  <Editor
    initialValue={"const foo = 'bar'"}
    onChange={(value) => {
      console.log(value);
    }}
  />
);

render(<App />, document.body);
