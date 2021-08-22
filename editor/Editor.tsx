import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createEditor, Descendant, Editor } from 'slate';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import {
  CodeElement,
  DefaultElement,
  ListElement,
  ListItemElement,
} from '../components/Elements';
import defaultContent from '../contents/default';
import storage from '../utils/storage';
import { onKeyDown } from './handlers';

interface EditorComponentProps {
  editor: Editor;
  content: Descendant[];
  onContentChange(content: Descendant[]): void;
  onKeyDown(event: KeyboardEvent<HTMLDivElement>): void;
}

const EditorComponent = ({
  editor,
  content,
  onContentChange,
  onKeyDown,
}: EditorComponentProps) => {
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

  return (
    <Slate editor={editor} value={content} onChange={onContentChange}>
      <Editable
        className="h-full text-xl"
        renderElement={renderElement}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
};

const EDITOR_CONTENT_KEY = 'content';

const EditorContainer = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState<Descendant[]>(defaultContent);

  useEffect(() => {
    const load = () => {
      const editorContent = storage.get(EDITOR_CONTENT_KEY);
      if (editorContent) {
        setContent(editorContent);
      }
    };

    load();
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <EditorComponent
      editor={editor}
      content={content}
      onContentChange={(content) => {
        setContent(content);
        storage.set(EDITOR_CONTENT_KEY, content);
      }}
      onKeyDown={(event) => onKeyDown(editor, event)}
    />
  );
};

export default EditorContainer;
