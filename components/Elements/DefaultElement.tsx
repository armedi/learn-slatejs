import { FC } from 'react';

const DefaultElement: FC<{ attributes: any }> = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default DefaultElement;
