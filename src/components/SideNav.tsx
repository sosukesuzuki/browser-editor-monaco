import { h } from "preact";
import { styled } from "goober";
import * as monaco from "monaco-editor";
import type { StateUpdater } from "preact/hooks";

const Container = styled("div")`
  width: 300px;
`;

type Props = {
  models: monaco.editor.ITextModel[];
  modelIdx: number;
  setModelIdx: StateUpdater<number>;
};

export default function SideNav({ models, modelIdx, setModelIdx }: Props) {
  return (
    <Container>
      {models.map((model, i) => {
        return (
          <div
            onClick={() => {
              setModelIdx(i);
            }}
            style={
              i === modelIdx ? { backgroundColor: "black", color: "white" } : {}
            }
          >
            {model.uri.path}
          </div>
        );
      })}
    </Container>
  );
}
