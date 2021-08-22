import flyd from 'flyd';
import type { KeyboardEvent } from 'react';
import { Descendant, Editor, Element, Transforms } from 'slate';
import defaultContent from '../../contents/default';
import { Storage } from '../../utils/storage';

const EDITOR_CONTENT_KEY = 'content';

class EditorViewModel {
  content = flyd.stream([{ text: '' }] as Descendant[]);

  constructor(public editor: Editor, private storage: Storage) {}

  async load(callback: (content: Descendant[]) => void) {
    this.content.map(callback);

    const storedContent = await this.storage.get(EDITOR_CONTENT_KEY);
    if (storedContent) {
      this.content(storedContent);
    } else {
      this.content(defaultContent);
    }
  }

  onContentChange = (newContent: Descendant[]) => {
    this.content(newContent);
    this.storage.set(EDITOR_CONTENT_KEY, newContent);
  };

  onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case '-':
        this.onKeyDown_Dash(event);
        break;
      case 'Backspace':
        this.onKeyDown_Backspace(event);
        break;
      default:
        break;
    }
  };

  private onKeyDown_Dash(event: KeyboardEvent<HTMLDivElement>) {
    const [match] = Editor.nodes<Element>(this.editor, {
      match: (n) => Element.isElement(n) && n.type === 'list-item',
    });
    if (!match) {
      event.preventDefault();
      Transforms.setNodes(
        this.editor,
        { type: 'list-item' },
        { match: (n) => Editor.isBlock(this.editor, n) }
      );
      Transforms.wrapNodes(this.editor, {
        type: 'list',
        children: [],
      });
    }
  }

  private onKeyDown_Backspace(event: KeyboardEvent<HTMLDivElement>) {
    const [match] = Editor.nodes<Element>(this.editor, {
      match: (node) => Element.isElement(node) && node.type === 'list-item',
    });

    if (match) {
      const [_, path] = match;

      if (Editor.isStart(this.editor, this.editor.selection!.focus, path)) {
        event.preventDefault();
        if (path.length > 1) {
          Transforms.liftNodes(this.editor);
        }
        Transforms.setNodes(this.editor, { type: 'paragraph' });
      }
    }
  }
}

export default EditorViewModel;
