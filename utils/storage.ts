const EDITOR_CONTENT_KEY = 'content';

export const storeEditorContent = (value: any) => {
  localStorage.setItem(EDITOR_CONTENT_KEY, JSON.stringify(value));
};

export const retrieveEditorContent = () => {
  try {
    const stringValue = localStorage.getItem(EDITOR_CONTENT_KEY);
    if (stringValue) {
      return JSON.parse(stringValue);
    }
    return null;
  } catch (error) {
    return null;
  }
};
