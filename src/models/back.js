import {eventCharts} from '../services/back';

export default {
  namespace: 'back',
  state: {
    getCharts:[],
  },

  effects: {
    * getCharts({payload,callback}, {call, put}) {
      const response = yield call(eventCharts,payload);
      yield put({
        type: 'setCharts',
        payload: response,
      });
      if(callback) callback(response)
    },
  },

  reducers: {
    setCharts(state, action) {
      return {
        ...state,
        getCharts: action.payload,
      };
    }
  }
};
