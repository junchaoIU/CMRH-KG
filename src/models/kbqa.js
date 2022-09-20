import {getQuestion} from '../services/kbqa';

export default {
  namespace: 'answer',
  state: {
    getQuestion:"",
  },

  effects: {
    * getQuestion({payload,callback}, {call, put}) {
      const response = yield call(getQuestion,payload);
      yield put({
        type: 'setQuestion',
        payload: response,
      });
      if(callback) callback(response)
    },
  },

  reducers: {
    setQuestion(state, action) {
      return {
        ...state,
        getKeyword: action.payload,
      };
    },
  }
};
