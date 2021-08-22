import { KeyboardEvent } from 'react';
import { Editor, Element, Transforms } from 'slate';

const onKeyDown_Backspace =
  (editor: Editor) => (event: KeyboardEvent<HTMLDivElement>) => {
    const [match] = Editor.nodes<Element>(editor, {
      match: (node) => Element.isElement(node) && node.type === 'list-item',
    });

    if (match) {
      const [_, path] = match;

      if (Editor.isStart(editor, editor.selection!.focus, path)) {
        event.preventDefault();
        if (path.length > 1) {
          Transforms.liftNodes(editor);
        }
        Transforms.setNodes(editor, { type: 'paragraph' });
      }
    }
  };

export default onKeyDown_Backspace;
