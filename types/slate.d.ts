import { BaseEditor, Text } from 'slate';
import { ReactEditor } from 'slate-react';

type ParagraphElement = { type: 'paragraph'; children: Text[] };
type CodeElement = { type: 'code'; children: Text[] };
type ListElement = {
  type: 'list';
  children: ListItemElement[];
  ordered?: boolean;
};
type ListItemElement = { type: 'list-item'; children: Text[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement | CodeElement | ListElement | ListItemElement;
  }
}
