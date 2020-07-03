import { h, render } from "preact";
import { styled, setPragma } from "goober";

setPragma(h);

const Heading1 = styled("h1")`
  color: red;
`;

const App = () => <Heading1>browser-editor-monaco</Heading1>;

render(<App />, document.body);
