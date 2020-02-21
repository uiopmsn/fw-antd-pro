export default {
  'GET /api/currentMenu': {
    "msg": "成功",
    "code": 1,
    "data": [
      {
        "path": "/welcome",
        "children": [],
        "icon": "",
        "name": "欢迎"
      },
      {
        "path": "/sysMange",
        "children": [
          {
            "path": "/sysMange/permManage",
            "children": [],
            "icon": "",
            "name": "菜单权限"
          },
          {
            "path": "/sysMange/userManage",
            "children": [],
            "icon": "",
            "name": "用户管理"
          }
        ],
        "icon": "",
        "name": "系统管理"
      }
    ]
  }

};
