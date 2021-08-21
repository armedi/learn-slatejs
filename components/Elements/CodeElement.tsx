import { FC } from 'react';

const CodeElement: FC<{ attributes: any }> = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export default CodeElement;
