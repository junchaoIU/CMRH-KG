export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/knowledgeSearch',
                name: 'knowledgeSearch',
                icon: 'file-search',
                component: './KnowledgeSearch',
              },
              {
                path: '/relationSearch',
                name: 'relationSearch',
                icon: 'node-index',

                component: './RelationSearch',
              },
              {
                path: '/timespacesEarch',
                name: 'timespacesEarch',
                icon: 'hourglass',
                component: './TimespacesEarch',
              },
              {
                path: '/back',
                name: 'back',
                icon: 'interaction',
                component: './Back',
              },
              {
                path: '/textBack',
                name: 'textBack',
                icon: 'ungroup',
                component: './TextBack',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
