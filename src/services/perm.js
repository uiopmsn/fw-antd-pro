import request from '@/utils/request';

export async function queryAllPerm() {
  return request('/server/api/perm/getAllPerm');
}

export async function queryRolePerm(params) {
  return request('/server/api/perm/getRolePerm', {params});
}
