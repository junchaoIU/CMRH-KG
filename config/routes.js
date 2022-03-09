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
                icon: 'home',
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
                icon: 'search',
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
                icon: 'file-search',
                component: './TextBack',
              },
              {
                path: '/informationExtraction',
                name: 'informationExtraction',
                icon: 'ungroup',
                routes: [
                  {
                    path: '/informationExtraction/baikeExtraction',
                    name: 'informationExtraction',
                    icon: 'ungroup',
                    component: './InformationExtraction',
                  },
                  {
                    path: '/informationExtraction/kgTramsformer',
                    name: 'kgTramsformer',
                    icon: 'ungroup',
                    component: './KGTramsformer',
                  },
                ],
              },
              {
                path: '/kbqa',
                name: 'kbqa',
                icon: 'comment',
                component: './KBQA',
              },
              {
                path: '/openApi',
                name: 'openApi',
                icon: 'cloudSync',
                component: './OpenApi',
              },
              {
                path: '/about',
                name: 'about',
                icon: 'instagram',
                component: './About',
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
