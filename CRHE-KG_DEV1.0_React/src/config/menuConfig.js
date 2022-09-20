/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 *  {
    title: "组件",
    path: "/components",
    icon: "appstore",
    roles:["admin","editor"],
    children: [
      {
        title: "富文本",
        path: "/components/richTextEditor",
        roles:["admin","editor"],
      },
      {
        title: "Markdown",
        path: "/components/Markdown",
        roles:["admin","editor"],
      },
      {
        title: "拖拽列表",
        path: "/components/draggable",
        roles:["admin","editor"],
      },
    ],
  },
 {
    title: "图表",
    path: "/charts",
    icon: "area-chart",
    roles:["admin","editor"],
    children: [
      {
        title: "键盘图表",
        path: "/charts/keyboard",
        roles:["admin","editor"],
      },
      {
        title: "折线图",
        path: "/charts/line",
        roles:["admin","editor"],
      },
      {
        title: "混合图表",
        path: "/charts/mix-chart",
        roles:["admin","editor"],
      },
    ],
  },
 {
    title: "路由嵌套",
    path: "/nested",
    icon: "cluster",
    roles:["admin","editor"],
    children: [
      {
        title: "菜单1",
        path: "/nested/menu1",
        children: [
          {
            title: "菜单1-1",
            path: "/nested/menu1/menu1-1",
            roles:["admin","editor"],
          },
          {
            title: "菜单1-2",
            path: "/nested/menu1/menu1-2",
            children: [
              {
                title: "菜单1-2-1",
                path: "/nested/menu1/menu1-2/menu1-2-1",
                roles:["admin","editor"],
              },
            ],
          },
        ],
      },
    ],
  },
 {
    title: "表格",
    path: "/table",
    icon: "table",
    roles:["admin","editor"]
  },
 {
    title: "Excel",
    path: "/excel",
    icon: "file-excel",
    roles:["admin","editor"],
    children: [
      {
        title: "导出Excel",
        path: "/excel/export",
        roles:["admin","editor"]
      },
      {
        title: "上传Excel",
        path: "/excel/upload",
        roles:["admin","editor"]
      }
    ],
  },
 */
const menuList = [
      {
        title: "首页",
        path: "/dashboard",
        icon: "home",
        roles:["guest"]
      },
      {
        title: "知识检索",
        path: "/knowledgesearch",
        icon: '&#xe602;',
        roles:["guest"]
      },
      {
        title: "时空检索",
        path: "/timespacesearch",
        icon: '&#xe602;',
        roles:["guest"]
      },
      {
        title: "关系检索",
        path: "/relationsearch",
        icon: "copy",
        roles:["guest"]
      },
  /*{
    title: "人物回溯",
    path: "/peopleback",
    icon: "file-zip",
    roles:["guest"]
  },
  {
    title: "事件回溯",
    path: "/thingback",
    icon: "file-zip",
    roles:["guest"]
  },*/
    {
        title: "实体回溯",
        path: "/back",
        icon: "file-zip",
        roles:["guest"]
    },
  {
    title: "语料回溯",
    path: "/textback",
    icon: "file-zip",
    roles:["guest"]
  },
    {
        title: "更新日志&建议",
        path: "/bug",
        icon: "bug",
        roles:["admin"]
    },
    /*
    {
        title: "地图回溯",
        path: "/mapback",
        icon: "file-zip",
        roles:["admin","editor"]
    },

  {
    title: "权限测试",
    path: "/permission",
    icon: "lock",
    children: [
      {
        title: "权限说明",
        path: "/permission/explanation",
        roles:["admin"]
      },
      {
        title: "admin页面",
        path: "/permission/adminPage",
        roles:["admin"]
      },
      {
        title: "guest页面",
        path: "/permission/guestPage",
        roles:["guest"]
      },
      {
        title: "editor页面",
        path: "/permission/editorPage",
        roles:["editor"]
      },
    ],
  },*/
    {
        title: "数据管理",
        path: "/manage",
        icon: "cluster",
        roles:["admin"],
        children: [
            {
                title: "语料管理",
                path: "/manage/book",
            },
        ],
    },
  {
    title: "用户管理",
    path: "/user",
    icon: "usergroup-add",
    roles:["admin"]
  },
  {
    title: "关于作者",
    path: "/about",
    icon: "user",
    roles:["guest"]
  },
  {
    title: "文档",
    path: "/docs",
    icon: "file",
    roles:["admin"]
  },
];
export default menuList;
