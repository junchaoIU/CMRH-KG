import {getAllEvent,getChildEvent,getPeople} from '../services/back';

export default {
  namespace: 'back',
  state: {
    allEvent:[],
    childEvent:{},
    people:{}
  },

  effects: {
    * getAllEvent({payload}, {call, put}) {
      const response = yield call(getAllEvent);
      yield put({
        type: 'setAllEvent',
        payload: response,
      });
    },
    * getChildEvent({ payload,callback },{ call,put }){
      const response = yield call(getChildEvent,payload);
      yield put({
        type: 'setChildEvent',
        payload: response,
      });
      if(callback) callback(response)
    },
    * getPeople({ payload,callback },{ call,put }){
      const response = yield call(getPeople,payload);
      yield put({
        type: 'setPeople',
        payload: response,
      });
      if(callback) callback(response)
    }
  },


  reducers: {
    setAllEvent(state, action) {
      return {
        ...state,
        allEvent: action.payload,
      };
    },
    setChildEvent(state, action) {
      return {
        ...state,
        childEvent: action.payload,
      };
    },
    setPeople(state, action) {
      return {
        ...state,
        people: action.payload,
      };
    }
  }
};
