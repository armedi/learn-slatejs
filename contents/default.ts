import { Descendant } from 'slate';

const value: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'In 5 years from now, I will be',
      },
    ],
  },

  {
    type: 'list',
    children: [
      {
        type: 'list-item',
        children: [
          {
            text: '',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  { type: 'paragraph', children: [{ text: 'And to achieve that, I will do' }] },
  {
    type: 'list',
    ordered: true,
    children: [
      {
        type: 'list-item',
        children: [
          {
            text: '',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
];

export default value;
