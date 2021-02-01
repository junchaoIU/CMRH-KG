import {relationSearch} from '../services/relationSearch';

export default {
  namespace: 'relation',
  state: {
    getPeople:[],
  },

  effects: {
    * getPeople({payload,callback}, {call, put}) {
      const response = yield call(relationSearch,payload);
      yield put({
        type: 'setPeople',
        payload: response,
      });
      if(callback) callback(response)
    },
  },

  reducers: {
    setPeople(state, action) {
      return {
        ...state,
        getPeople: action.payload,
      };
    }
  }
};
