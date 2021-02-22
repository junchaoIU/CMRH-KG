import {
  getTimeRecallDetail,
  getTime,
  getPeriodTimeRecallDetail,
  getPeriodTime,
  getSpaceRecallDetail,
  getSpace,
  getTimeSpaceRecallDetail,
  getTimeSpace
} from '../services/timespacesEarch';

export default {
  namespace: 'timeSpaces',
  state: {
    timeRecallDetail: [],
    timeDetail: [],
    periodTimeRecallDetail: [],
    periodTime: [],
    spaceRecallDetail: [],
    space: [],
    timeSpaceRecallDetail:[],
    timeSpace:[]
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
    * getTimeDetail({ payload,callback },{ call,put }){
      const response = yield call(getTime,payload);
      yield put({
        type: 'setTimeDetail',
        payload: response,
      });
      if(callback) callback(response)
    },
    * getPeriodTimeRecallDetail({ payload,callback },{ call,put }){
      const response = yield call(getPeriodTimeRecallDetail,payload);
      yield put({
        type: 'setPeriodTimeRecallDetail',
        payload: response,
      });
      if(callback) callback(response)
    },
    * getPeriodTime({ payload,callback },{ call,put }){
      const response = yield call(getPeriodTime,payload);
      yield put({
        type: 'setPeriodTime',
        payload: response,
      });
      if(callback) callback(response)
    },
    * getSpaceRecallDetail({ payload,callback },{ call,put }){
      const response = yield call(getSpaceRecallDetail,payload);
      yield put({
        type: 'setSpaceRecallDetail',
        payload: response,
      });
      if(callback) callback(response)
    },
    * getSpace({ payload,callback },{ call,put }){
      const response = yield call(getSpace,payload);
      yield put({
        type: 'setSpace',
        payload: response,
      });
      if(callback) callback(response)
    },
    * getTimeSpaceRecallDetail({ payload,callback },{ call,put }){
      const response = yield call(getTimeSpaceRecallDetail,payload);
      yield put({
        type: 'setTimeSpaceRecallDetail',
        payload: response,
      });
      if(callback) callback(response)
    },
    * getTimeSpace({ payload,callback },{ call,put }){
      const response = yield call(getTimeSpace,payload);
      yield put({
        type: 'setTimeSpace',
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
    },
    setTimeDetail(state,action){
      return {
        ...state,
        timeDetail: action.payload,
      };
    },
    setPeriodTimeRecallDetail(state,action){
      return {
        ...state,
        periodTimeRecallDetail: action.payload,
      };
    },
    setPeriodTime(state,action){
      return {
        ...state,
        periodTime: action.payload,
      };
    },
    setSpaceRecallDetail(state,action){
      return {
        ...state,
        spaceRecallDetail: action.payload,
      };
    },
    setSpace(state,action){
      return {
        ...state,
        space: action.payload,
      };
    },
    setTimeSpaceRecallDetail(state,action){
      return {
        ...state,
        timeSpaceRecallDetail: action.payload,
      };
    },
    setTimeSpace(state,action){
      return {
        ...state,
        timeSpace: action.payload,
      };
    }
  }
};
