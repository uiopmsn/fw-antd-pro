import { queryAllPerm } from '@/services/perm';

export default {
  namespace: 'perm',
  state:{
    treeData: [],
  },

  effects:{
    *queryTreeData(_, sagaEffects){
      const { call, put } = sagaEffects;
      const response = yield call(queryAllPerm);
      if (response && response.code){
        if (response.code === 1){
          yield put({ type: 'save', payload: response.data });
        }

      }

    },
  },

  reducers: {
    save(state, { payload: data }){
      return {
        treeData: data,
      };
    }
  },


}