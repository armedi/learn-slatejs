import { RenderElementProps } from 'slate-react';
import type { ListElement as IListElement } from '../../types/slate';

const ListElement = (props: RenderElementProps) => {
  const element = props.element as IListElement;

  if (element.ordered) {
    return (
      <ol className="list-decimal list-inside" {...props.attributes}>
        {props.children}
      </ol>
    );
  }

  return (
    <ul className="list-disc list-inside" {...props.attributes}>
      {props.children}
    </ul>
  );
};

export default ListElement;
