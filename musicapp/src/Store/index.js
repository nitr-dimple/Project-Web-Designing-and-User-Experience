import { createStore } from 'redux';
import reducer from './Reducer/index';

const store = createStore(reducer);
export default store;