export const getDatabases = () => dispatch => {
  dispatch({ type: 'request_databases' });
  return fetch('/api/databases').then(res => res.json()).then(databases => {
    dispatch({ type: 'receive_databases', databases });
  });
};

export const getCollections = (database) => dispatch => {
  dispatch({ type: 'request_collections' });
  return fetch(`/api/${database}/collections`).then(res => res.json()).then(collections => {
    dispatch({ type: 'receive_collections', collections });
  });
};

export const getDocs = (d, c) => dispatch => {
  dispatch({ type: 'request_docs' });
  return fetch(`/api/${d}/${c}/docs`).then(res => res.json()).then(docs => {
    dispatch({ type: 'receive_docs', docs });
  });
};
