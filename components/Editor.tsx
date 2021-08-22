import { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import defaultContent from '../contents/default';
import { onKeyDown } from '../handlers';
import { retrieveEditorContent, storeEditorContent } from '../utils/storage';
import {
  CodeElement,
  DefaultElement,
  ListElement,
  ListItemElement,
} from './Elements';

const EditorComponent = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState<Descendant[]>(defaultContent);

  useEffect(() => {
    const load = () => {
      const editorContent = retrieveEditorContent();
      if (editorContent) {
        setValue(editorContent);
      }
    };

    load();
    setLoaded(true);
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      case 'list':
        return <ListElement {...props} />;
      case 'list-item':
        return <ListItemElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  if (!loaded) return null;

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        storeEditorContent(newValue);
      }}
    >
      <Editable
        className="h-full text-xl"
        renderElement={renderElement}
        onKeyDown={onKeyDown(editor)}
      />
    </Slate>
  );
};

export default EditorComponent;
