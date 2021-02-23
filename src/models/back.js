import {getAllEvent} from '../services/back';

export default {
  namespace: 'back',
  state: {
    allEvent:[],
  },

  effects: {
    * getAllEvent({payload}, {call, put}) {
      const response = yield call(getAllEvent);
      yield put({
        type: 'setAllEvent',
        payload: response,
      });
    },
  },


  reducers: {
    setAllEvent(state, action) {
      return {
        ...state,
        allEvent: action.payload,
      };
    }
  }
};
