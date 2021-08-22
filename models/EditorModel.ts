import flyd from 'flyd';
import { Descendant, Editor, Element, Path, Text, Transforms } from 'slate';
import defaultContent from '../contents/default';
import { Storage } from '../utils/storage';

const EDITOR_CONTENT_KEY = 'content';

class EditorModel {
  content = flyd.stream([{ text: '' }] as Descendant[]);

  constructor(public editor: Editor, private storage: Storage) {}

  async init() {
    const storedContent = await this.storage.get(EDITOR_CONTENT_KEY);
    if (storedContent) {
      this.content(storedContent);
    } else {
      this.content(defaultContent);
    }
  }

  updateContent = (newContent: Descendant[]) => {
    this.content(newContent);
    this.storage.set(EDITOR_CONTENT_KEY, newContent);
  };

  insertText(text: string, path?: Path) {
    Transforms.insertText(this.editor, text, { at: path });
  }

  wrapNodesInList(options: { ordered?: boolean }, callback?: () => void) {
    const [match] = Editor.nodes<Element>(this.editor, {
      match: (n) => Element.isElement(n) && n.type === 'list-item',
    });
    // already a list item
    if (match) return;

    if (options.ordered) {
      const [element] = Editor.node(this.editor, this.editor.selection!.focus);
      if (!Text.isText(element) || !/^\d+$/.test(element.text)) {
        return;
      }
      Transforms.insertText(this.editor, '', {
        at: this.editor.selection!.focus.path,
      });
    } else if (
      !Editor.isStart(
        this.editor,
        this.editor.selection!.focus,
        this.editor.selection!
      )
    ) {
      return;
    }

    Transforms.setNodes(
      this.editor,
      { type: 'list-item' },
      { match: (n) => Editor.isBlock(this.editor, n) }
    );
    Transforms.wrapNodes(this.editor, {
      type: 'list',
      ordered: Boolean(options.ordered),
      children: [],
    });

    callback?.();
  }

  unwrapList(callback?: () => void) {
    const [match] = Editor.nodes<Element>(this.editor, {
      match: (node) => Element.isElement(node) && node.type === 'list-item',
    });

    if (match) {
      const [_, path] = match;

      if (Editor.isStart(this.editor, this.editor.selection!.focus, path)) {
        if (path.length > 1) {
          Transforms.liftNodes(this.editor);
        }
        Transforms.setNodes(this.editor, { type: 'paragraph' });
        callback?.();
      }
    }
  }
}

export default EditorModel;
