export default {
  'GET /api/queryAllPerm': {
    code: 1,
    msg: "",
    data: [
      {
        title: '系统设置',
        key: '/systemMange',
        children: [
          {
            title: '角色管理',
            key: '/systemMange/roleMange',
            children: [
              { title: '0-0-0-0', key: '0-0-0-0' },
              { title: '0-0-0-1', key: '0-0-0-1' },
              { title: '0-0-0-2', key: '0-0-0-2' },
            ],
          },
          {
            title: '权限管理',
            key: '0-0-1',
            children: [
              { title: '0-0-1-0', key: '0-0-1-0' },
              { title: '0-0-1-1', key: '0-0-1-1' },
              { title: '0-0-1-2', key: '0-0-1-2' },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
          key: '0-1',
        children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
      },
      {
        title: '0-2',
          key: '0-2',
      },
    ]
  },

  'GET /api/getPermByRole': {
    code: 1,
    msg: "",
    data: [
      "0-2",
      "/systemMange/roleMange",
      "0-0-0-0",
      "0-0-0-1",
      "0-0-0-2"
    ]
      ,
  }

}
