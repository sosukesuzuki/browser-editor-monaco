import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import * as monaco from "monaco-editor";
import { format } from "../prettier.worker";
import { prettierrcUri } from "..";

declare const ResizeObserver: any;

type Props = {
  model: monaco.editor.ITextModel;
  onChange: (value: string) => void;
};

monaco.languages.registerDocumentFormattingEditProvider("typescript", {
  async provideDocumentFormattingEdits(model) {
    const prettierrcModel = monaco.editor.getModel(prettierrcUri);
    const options = prettierrcModel ? JSON.parse(prettierrcModel.getValue()) : undefined;
    const text = await format(model.getValue(), options);
    return [
      {
        range: model.getFullModelRange(),
        text,
      },
    ];
  },
});

export default function Editor({ model, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [
    editor,
    setEditor,
  ] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  useEffect(() => {
    if (ref.current) {
      const editor = monaco.editor.create(ref.current, {
        model,
        fontSize: 18,
        theme: "vs-dark",
      });
      model.onDidChangeContent(() => {
        onChange(editor.getValue());
      });
      setEditor(editor);
      editor.layout();
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
        editor.getAction("editor.action.formatDocument").run();
      });
      const resizeObserver = new ResizeObserver(() => {
        editor.layout();
      });
      resizeObserver.observe(ref.current);
      return () => resizeObserver.unobserve(ref.current);
    }
  }, [ref]);
  useEffect(() => {
    if (editor) {
      editor.setModel(model);
    }
  }, [model]);
  return (
    <div ref={ref} style={{ height: "100%", width: "calc(100% - 30px)" }}></div>
  );
}
