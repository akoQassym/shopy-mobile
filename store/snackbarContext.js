import { createContext, useState } from 'react';

export const SnackbarContext = createContext({
  snackbar: [],
  createSnackbar: (type, title, text, duration) => {},
  deleteSnackbar: () => {},
});

const SnackbarContextProvider = ({ children }) => {
  const [snackbarArr, setSnackbarArr] = useState([]);

  const createSnackbar = (type = 'info', title, text, duration = 2500) => {
    setSnackbarArr((prev) => [
      ...prev,
      {
        title: title,
        text: text,
        duration: duration,
        type: type,
      },
    ]);

    timer = setTimeout(() => {
      deleteSnackbar(0);
    }, duration);
  };

  const deleteSnackbar = (index) => {
    setSnackbarArr((prev) => prev.filter((_, i) => i !== index));
  };

  const value = {
    snackbar: snackbarArr,
    createSnackbar: createSnackbar,
    deleteSnackbar: deleteSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
