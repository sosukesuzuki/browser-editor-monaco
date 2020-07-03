import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import * as monaco from "monaco-editor";

declare const ResizeObserver: any;

type Props = {
  initialValue: string;
  onChange: (value: string) => void;
};

export default function Editor({ initialValue, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [
    editor,
    setEditor,
  ] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  useEffect(() => {
    if (ref.current) {
      const model = monaco.editor.createModel(initialValue, "typescript");
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
  return <div ref={ref} style={{ height: "100%", width: "100%" }}></div>;
}
