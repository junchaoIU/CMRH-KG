import {knowledgeSearch,attributeSearch} from '../services/knowledgeSearch';

export default {
  namespace: 'knowledge',
  state: {
    getKeyword:[],
    getAttribute:[]
  },

  effects: {
    * getKeyword({payload,callback}, {call, put}) {
      const response = yield call(knowledgeSearch,payload);
      yield put({
        type: 'setKeyword',
        payload: response,
      });
      if(callback) callback(response)
    },
    * getAttribute({payload,callback}, {call, put}) {
      const response = yield call(attributeSearch,payload);
      yield put({
        type: 'setAttribute',
        payload: response,
      });
      if(callback) callback(response)
    },
  },

  reducers: {
    setKeyword(state, action) {
      return {
        ...state,
        getKeyword: action.payload,
      };
    },
    setAttribute(state, action) {
      return {
        ...state,
        getAttribute: action.payload,
      };
    },
  }
};
