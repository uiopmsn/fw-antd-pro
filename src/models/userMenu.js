import { queryCurrentMenu } from '@/services/user';

const UserMenuModel = {
  namespace: 'userMenu',
  state: {
    currentMenu: [],
  },
  effects: {
    /*
    代表事件的Action对象，由于函数体不需要Action内容，所有使用`_`占位符代替Action对象了
    const { call, put } = sagaEffects
    也可以yield call(request, url), 这里统一放到services
     */
    *fetchCurrentMenu(_, { call, put }) {
      const response = yield call(queryCurrentMenu);
      yield put({
        type: 'saveCurrentMenu',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentMenu(state, action) {
      return { ...state, currentMenu: action.payload || [] };
    },
  },
};
export default UserMenuModel;
