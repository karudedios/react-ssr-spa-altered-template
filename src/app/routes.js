// Page Containers with components
import Layout from './layouts/layout';

// Data handle async / sync data fetching for page
import aboutRoute from './pages/about_page/about_route';
import indexPageRoute from './pages/index_page/index_page_route';
import notFoundRoute from './pages/not_found_page/not_found_route';

export default [
  {
    component: Layout,
    routes: [
      aboutRoute,
      indexPageRoute,
      notFoundRoute
    ]
  }
];
