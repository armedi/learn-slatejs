import { FC, useCallback, useMemo, useState } from 'react';
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

const EditorComponent: FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>(defaultContent);

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
      onChange={(newValue) => setValue(newValue)}
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
