import { KeyboardEvent } from 'react';
import { Editor, Element, Transforms } from 'slate';

const onKeyDown_Dash =
  (editor: Editor) => (event: KeyboardEvent<HTMLDivElement>) => {
    const [match] = Editor.nodes<Element>(editor, {
      match: (n) => Element.isElement(n) && n.type === 'list-item',
    });
    if (!match) {
      event.preventDefault();
      Transforms.setNodes(
        editor,
        { type: 'list-item' },
        { match: (n) => Editor.isBlock(editor, n) }
      );
      Transforms.wrapNodes(editor, {
        type: 'list',
        ordered: true,
        children: [],
      });
    }
  };

export default onKeyDown_Dash;
