import {homeData} from '../services/welcome';
export default {
  namespace: 'welcome',
  state: {
    knowledge:{}
  },

  effects: {
    * getHomeData({payload}, {call, put}) {
      const response = yield call(homeData);
      yield put({
        type: 'getData',
        payload: response,
      });
    },
  },

  reducers: {
    getData(state, action) {
      return {
        ...state,
        knowledge: action.payload,
      };
    }
  }
};
