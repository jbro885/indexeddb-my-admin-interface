export default (state = {}, action) => {

  if (action.type === 'SET_STORE_VALUES')
    console.warn(action);

  switch (action.type) {
    case 'SET_STORES':
      return {
        ...state,
        list: action.payload.list.map(name => ({ name })),
      };

    case 'SET_STORE_VALUES':
      return {
        ...state,
        values: { ...action.payload.values },
      };

    default:
      return state;
  }
};
