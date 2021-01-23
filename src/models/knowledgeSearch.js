import {knowledgeSearch,attributeSearch,substanceSearch} from '../services/knowledgeSearch';

export default {
  namespace: 'knowledge',
  state: {
    getKeyword:[],
    getAttribute:[],
    getSubstance:[]
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
    * getSubstance({payload,callback}, {call, put}) {
      const response = yield call(substanceSearch,payload);
      yield put({
        type: 'setSubstance',
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
    setSubstance(state, action) {
      return {
        ...state,
        getSubstance: action.payload,
      };
    },
  }
};
