import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import defaultContent from '../contents/default';
import { onKeyDown } from '../handlers';
import {
  CodeElement,
  DefaultElement,
  ListElement,
  ListItemElement,
} from './Elements';

interface EditorComponentProps {
  initialContent?: Descendant[];
  storeContent?: (value: Descendant[]) => void;
}

const EditorComponent = ({
  initialContent,
  storeContent,
}: EditorComponentProps) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>(
    initialContent && initialContent?.length > 0
      ? initialContent
      : defaultContent
  );

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
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        storeContent?.(newValue);
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
