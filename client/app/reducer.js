const initialState = {
  databases: {},
  collections: [],
  docs: [],
  isFetching: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'request_databases':
    case 'request_collections':
    case 'request_docs':
      return {
        ...state,
        isFetching: true
      };
    case 'receive_databases':
    case 'receive_collections':
    case 'receive_docs':
      return {
        ...state,
        isFetching: false,
        ...action
      };
    default:
      return state;
  }
}

export default reducer;
