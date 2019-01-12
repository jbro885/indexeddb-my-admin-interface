import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers/root';

const initialState = {
  database: {
    list: [
      { name: 'gih-reservations', version: 2 },
      { name: 'database1', version: 2 },
      { name: 'database2', version: 2 },
      { name: 'database3', version: 2 },
      { name: 'database4', version: 2 },
      { name: 'database_teste', version: 2 },
      { name: 'database_teste', version: 2 },
      { name: 'database_teste', version: 3 },
    ],
    selected: {
      name: 'gih-reservations',
      version: 2,
    },
  },
  stores: {
    list: [
      { name: 'reservations-test', owner: { name: 'gih-reservations', version: 2 }}
    ]
  }
};


/**
 * Middleware detected errors
 */
const nullMiddleware = () => next => action => {
  console.info('Middleware: ', action);

  next(action ? action : { type: 'UNKNOWN' });
};


/**
 * Middleware sent command to Chrome's extension
 */
const commands = new window.Commands;


const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== 'FETCH_INDEXEDDB_EXTENSION')
    return;

  const { command, data, onSuccess, onFailure } = action.payload;

  commands.exec({ type: command, payload: data })
    .then(data => dispatch(onSuccess(data)))
    .catch(er => dispatch(onFailure(er)));
};


const store = createStore(rootReducer, initialState, applyMiddleware(nullMiddleware, apiMiddleware));
const persistor = persistStore(store);


export { store, persistor };
