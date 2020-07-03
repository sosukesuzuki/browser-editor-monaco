import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import * as monaco from "monaco-editor";

declare const ResizeObserver: any;

type Props = {
  model: monaco.editor.ITextModel;
  onChange: (value: string) => void;
};

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
