import { FC, useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor, Element, Transforms } from 'slate';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import { CodeElement, DefaultElement } from './Elements';

const EditorComponent: FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'In 5 years from now, I will be ....' }],
    },
  ]);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
    >
      <Editable
        className="h-full text-xl"
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === '`' && event.ctrlKey) {
            event.preventDefault();
            const [match] = Editor.nodes<Element>(editor, {
              match: (n) => (n as Element).type === 'code',
            });
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: (n) => Editor.isBlock(editor, n) }
            );
          }
        }}
      />
    </Slate>
  );
};

export default EditorComponent;
