import request from '@/utils/request';

export async function queryAllPerm() {
  return request('/api/queryAllPerm');
}

export async function queryRolePerm(params) {
  return request('/api/getPermByRole', {params});
}
