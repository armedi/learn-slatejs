class Storage {
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    try {
      const stringValue = localStorage.getItem(key);
      if (stringValue) {
        return JSON.parse(stringValue);
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

const storage = new Storage();
export default storage;
