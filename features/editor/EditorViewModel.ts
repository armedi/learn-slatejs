import type { KeyboardEvent } from 'react';
import { Descendant } from 'slate';
import EditorModel from '../../models/EditorModel';

class EditorViewModel {
  constructor(public model: EditorModel) {}

  get content() {
    return this.model.content();
  }

  get editor() {
    return this.model.editor;
  }

  async load(callback: (content: Descendant[]) => void) {
    this.model.content.map(callback);
    await this.model.init();
  }

  onContentChange = (newContent: Descendant[]) => {
    this.model.updateContent(newContent);
  };

  onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case '-':
        this.model.wrapNodesInList({ ordered: false }, () =>
          event.preventDefault()
        );
        break;
      case '.': {
        this.model.wrapNodesInList({ ordered: true }, () =>
          event.preventDefault()
        );
        break;
      }
      case 'Backspace':
        this.model.unwrapList(() => event.preventDefault());
        break;
      default:
        break;
    }
  };
}

export default EditorViewModel;
