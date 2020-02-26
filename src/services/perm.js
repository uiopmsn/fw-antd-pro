import request from '@/utils/request';

export async function queryAllPerm() {
  return request('/api/queryAllPerm');
}
