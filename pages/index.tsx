import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Descendant } from 'slate';
import Editor from '../components/Editor';
import styles from '../styles/home.module.css';
import { retrieveEditorContent, storeEditorContent } from '../utils/storage';

const Home: NextPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [editorContent, setEditorContent] = useState<Descendant[]>([]);

  useEffect(() => {
    const load = () => {
      const editorContent = retrieveEditorContent();
      if (editorContent) {
        setEditorContent(editorContent);
      }
    };

    load();
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="h-screen flex flex-col pt-20 px-40 pb-0 bg-gray-700">
      <h1
        className={
          'text-6xl font-bold text-center text-white mb-16 ' + styles.title
        }
      >
        Type Your Dream
      </h1>
      <div className="flex-1 bg-white rounded-t-3xl p-10 pb-0">
        <Editor
          initialContent={editorContent}
          storeContent={storeEditorContent}
        />
      </div>
    </div>
  );
};

export default Home;
