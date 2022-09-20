import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'),loading: Loading});
const Doc = Loadable({loader: () => import(/*webpackChunkName:'Doc'*/'@/views/doc'),loading: Loading});
const KnowledgeSearch = Loadable({loader: () => import(/*webpackChunkName:'Guide'*/'@/views/knowledgesearch'),loading: Loading});
const Explanation = Loadable({loader: () => import(/*webpackChunkName:'Explanation'*/'@/views/permission'),loading: Loading});
const AdminPage = Loadable({loader: () => import(/*webpackChunkName:'AdminPage'*/'@/views/permission/adminPage'),loading: Loading});
const GuestPage = Loadable({loader: () => import(/*webpackChunkName:'GuestPage'*/'@/views/permission/guestPage'),loading: Loading});
const EditorPage = Loadable({loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/permission/editorPage'),loading: Loading});
const Zip = Loadable({loader: () => import(/*webpackChunkName:'Zip'*/'@/views/peopleback'),loading: Loading});
const ThingBack = Loadable({loader: () => import(/*webpackChunkName:'Zip'*/'@/views/thingback'),loading: Loading});
const MapBack = Loadable({loader: () => import(/*webpackChunkName:'Zip'*/'@/views/mapback'),loading: Loading});
const Relationsearch = Loadable({loader: () => import(/*webpackChunkName:'Relationsearch'*/'@/views/relationsearch'),loading: Loading});
const TimeSpacesearch = Loadable({loader: () => import(/*webpackChunkName:'TimeSpacesearch'*/'@/views/timespacesearch'),loading: Loading});
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});
const User = Loadable({loader: () => import(/*webpackChunkName:'User'*/'@/views/user'),loading: Loading});
const About = Loadable({loader: () => import(/*webpackChunkName:'About'*/'@/views/about'),loading: Loading});
const Bug = Loadable({loader: () => import(/*webpackChunkName:'Btug'*/'@/views/bug'),loading: Loading});
const Textback = Loadable({loader: () => import(/*webpackChunkName:'Textback'*/'@/views/textback'),loading: Loading});
const Book = Loadable({loader: () => import(/*webpackChunkName:'Book'*/'@/views//manage/book'),loading: Loading});
const Image = Loadable({loader: () => import(/*webpackChunkName:'Image'*/'@/views//manage/image'),loading: Loading});
const Back = Loadable({loader: () => import(/*webpackChunkName:'Back'*/'@/views//back'),loading: Loading});

export default [
  { path: "/dashboard", component: Dashboard, roles: ["admin","editor","guest"] },
  { path: "/docs", component: Doc, roles: ["admin","editor","guest"] },
  { path: "/knowledgesearch", component: KnowledgeSearch, roles: ["admin","editor"] },
  { path: "/permission/explanation", component: Explanation, roles: ["admin"] },
  { path: "/permission/adminPage", component: AdminPage, roles: ["admin"] },
  { path: "/permission/guestPage", component: GuestPage, roles: ["guest"] },
  { path: "/permission/editorPage", component: EditorPage, roles: ["editor"] },
  { path: "/peopleback", component: Zip, roles: ["admin","editor"] },
  { path: "/thingback", component: ThingBack, roles: ["admin","editor"] },
  { path: "/mapback", component: MapBack, roles: ["admin","editor"] },
  { path: "/relationsearch", component: Relationsearch, roles: ["admin","editor"] },
  { path: "/timespacesearch", component: TimeSpacesearch, roles: ["admin","editor"] },
  { path: "/user", component: User, roles: ["admin"] },
  { path: "/about", component: About, roles: ["admin", "editor", "guest"] },
  { path: "/bug", component: Bug, roles: ["admin"] },
  { path: "/textback", component: Textback, roles: ["admin"] },
  { path: "/manage/book", component: Book, roles: ["admin"] },
  { path: "/manage/image", component: Image, roles: ["admin"] },
  { path: "/back", component: Back, roles: ["admin"] },
  { path: "/error/404", component: Error404 },
];
