// import Home     from "./components/pages/Home";
// import Register from "./components/pages/Register";
// import NotFound from "./components/pages/NotFound";
const Home     = () => System.import('./components/pages/Home').then(m => m.default),
      Register = () => System.import('./components/pages/Register').then(m => m.default),
      NotFound = () => System.import('./components/pages/NotFound').then(m => m.default);

export const routes = [
  {path: '/',             component: Home,     name: 'Home'},
  {path: '/cadastro',     component: Register, name: 'Cadastro'},
  {path: '/cadastro/:id', component: Register, name: 'Editar', hidden: true},
  {path: '*',             component: NotFound, hidden: true}
];
