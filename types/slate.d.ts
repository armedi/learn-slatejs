import { BaseEditor, Text } from 'slate';
import { ReactEditor } from 'slate-react';

type ParagraphElement = { type: 'paragraph'; children: Text[] };
type CodeElement = { type: 'code'; children: Text[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement | CodeElement;
  }
}
