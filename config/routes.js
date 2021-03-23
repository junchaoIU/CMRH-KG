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
                path: '/use',
                name: 'use',
                component: './Welcome/use.jsx',
                hideInMenu: true,
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
                routes: [
                  {
                    path: '/back/eventBack',
                    name: 'eventBack',
                    icon: 'interaction',
                    component: './Back/eventBack',
                  },
                  {
                    path: '/back/peopleBack',
                    name: 'peopleBack',
                    icon: 'peopleBack',
                    component: './Back/peopleBack',
                  },
                ],
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
