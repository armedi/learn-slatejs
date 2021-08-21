import type { NextPage } from 'next';
import { FC, useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor, Element, Transforms } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

const CodeElement: FC<{ attributes: any }> = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement: FC<{ attributes: any }> = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Home: NextPage = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const renderElement = useCallback((props) => {
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
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === '`' && event.ctrlKey) {
            event.preventDefault();
            const [match] = Editor.nodes(editor, {
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

export default Home;
