import { queryAllPerm, queryRolePerm } from '@/services/perm';

export default {
  namespace: 'perm',
  state:{
    allPerm: [],
    rolePerm: [],
  },

  effects:{
    *queryAllPerm(_, sagaEffects){
      const { call, put } = sagaEffects;
      const response = yield call(queryAllPerm);
      if (response && response.code){
        if (response.code === 1){
          yield put({ type: 'saveAllPerm', payload: response.data });
        }
      }
    },

    *queryRolePerm({ payload: roleId }, { call, put } ){
      const response = yield call(queryRolePerm, roleId);
      if (response && response.code){
        if (response.code === 1){
          yield put({ type: 'saveRolePerm', payload: response.data });
        }
      }
    },
  },

  reducers: {
    saveAllPerm(state, { payload: data }){
      return {
        ...state,
        allPerm: data,
      };
    },
    saveRolePerm(state, { payload: data }){
      //console.log("perm model,payload: ", data);
      return {
        ...state,
        rolePerm: data,
      };
    },
  },


}
