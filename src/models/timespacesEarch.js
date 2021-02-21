import { getTimeRecallDetail } from '../services/timespacesEarch';

export default {
  namespace: 'timeSpaces',
  state: {
    timeRecallDetail: [],
  },

  effects: {
    * getTimeRecallDetail({ payload,callback },{ call,put }){
      const response = yield call(getTimeRecallDetail,payload);
      yield put({
        type: 'setTimeRecallDetail',
        payload: response,
      });
      if(callback) callback(response)
    },
  },

  reducers: {
    setTimeRecallDetail(state,action){
      return {
        ...state,
        timeRecallDetail: action.payload,
      };
    }
  }
};
