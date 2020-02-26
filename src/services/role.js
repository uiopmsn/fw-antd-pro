import request from '@/utils/request';
export async function queryRoleList(params) {
  return request('/api/roleList', {
    params,
  });
}
export async function stopRole(params) {
  return request('/api/role', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRole(params) {
  return request('/api/role', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRole(params) {
  return request('/api/role', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

export async function getPermByRole(params) {
  return request('/api/getPermByRole', {
    params,
  });
}
