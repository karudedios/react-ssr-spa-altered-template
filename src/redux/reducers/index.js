import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import config from './config_reducer';
import status from './status_reducer';

import repoDetail from './repo_detail/repo_detail_reducer';
import repoDetailPage from './repo_detail/repo_detail_page_reducer';

import searchPage from './search/search_page_reducer';
import search from './search/search_results_reducer';

import indexPage from './index/index_page_reducer';
import aboutPage from '../../app/about_page/about_page_reducer';

export default combineReducers({
  routing,

  config,
  status,

  indexPage,
  aboutPage,

  repoDetailPage,
  repoDetail,

  searchPage,
  search
});
