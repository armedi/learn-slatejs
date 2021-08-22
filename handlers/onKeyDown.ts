import { KeyboardEvent } from 'react';
import { Editor } from 'slate';
import onKeyDown_Backspace from './onKeyDown_Backspace';
import onKeyDown_Dash from './onKeyDown_Dash';

const KEY_DASH = '-';
const KEY_BACKSPACE = 'Backspace';

const onKeyDown =
  (editor: Editor) => (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case KEY_DASH:
        onKeyDown_Dash(editor)(event);
        break;
      case KEY_BACKSPACE:
        onKeyDown_Backspace(editor)(event);
        break;
      default:
        break;
    }
  };

export default onKeyDown;
