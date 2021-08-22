import { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import {
  CodeElement,
  DefaultElement,
  ListElement,
  ListItemElement,
} from '../../components/Elements';
import EditorModel from '../../models/EditorModel';
import storage from '../../utils/storage';
import EditorViewModel from './EditorViewModel';

interface EditorComponentProps {
  viewModel: EditorViewModel;
}

const EditorView = ({ viewModel }: EditorComponentProps) => {
  const [content, setContent] = useState(viewModel.content);

  useEffect(() => {
    viewModel.load(setContent);
  }, [viewModel]);

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
      editor={viewModel.editor}
      value={content}
      onChange={viewModel.onContentChange}
    >
      <Editable
        className="h-full text-xl"
        renderElement={renderElement}
        onKeyDown={viewModel.onKeyDown}
      />
    </Slate>
  );
};

const EditorViewContainer = () => {
  const viewModel = useMemo(() => {
    const editor = withReact(createEditor());
    const model = new EditorModel(editor, storage);
    return new EditorViewModel(model);
  }, []);

  return <EditorView viewModel={viewModel} />;
};

export default EditorViewContainer;
