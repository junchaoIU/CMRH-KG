import {informationExaction, getProcessNum, txtExtraction} from '../services/knowledgeExtraction';

export default {
  namespace: 'information',
  state: {
    getWebKG:[],
    getProcessNum:0,
    getTxtExtraction:{}
  },

  effects: {
    * getWebKG({payload,callback}, {call, put}) {
      const response = yield call(informationExaction,payload);
      yield put({
        type: 'setWebKG',
        payload: response,
      });
      if(callback) callback(response)
    },

    * getProcessNum({payload,callback}, {call, put}) {
      const response = yield call(getProcessNum,payload);
      yield put({
        type: 'setProcessNum',
        payload: response,
      });
      if(callback) callback(response)
    },

    * getTxtExtraction({payload,callback}, {call, put}) {
      const response = yield call(txtExtraction,payload);
      yield put({
        type: 'setTxtExtraction',
        payload: response,
      });
      if(callback) callback(response)
    },

    // * getAttribute({payload,callback}, {call, put}) {
    //   const response = yield call(attributeSearch,payload);
    //   yield put({
    //     type: 'setAttribute',
    //     payload: response,
    //   });
    //   if(callback) callback(response)
    // },
    // * getSubstance({payload,callback}, {call, put}) {
    //   const response = yield call(substanceSearch,payload);
    //   yield put({
    //     type: 'setSubstance',
    //     payload: response,
    //   });
    //   if(callback) callback(response)
    // },
  },

  reducers: {
    setWebKG(state, action) {
      return {
        ...state,
        getWebKG: action.payload,
      };
    },
    setProcessNum(state, action) {
      return {
        ...state,
        getProcessNum: action.payload,
      };
    },
    setTxtExtraction(state, action) {
      return {
        ...state,
        getTxtExtraction: action.payload,
      };
    },
    // setAttribute(state, action) {
    //   return {
    //     ...state,
    //     getAttribute: action.payload,
    //   };
    // },
    // setSubstance(state, action) {
    //   return {
    //     ...state,
    //     getSubstance: action.payload,
    //   };
    // },
  }
};
