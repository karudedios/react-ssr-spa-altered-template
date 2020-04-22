import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import config from './config_reducer';
import status from './status_reducer';

import indexPage from '../../app/pages/index_page/index_page_reducer';
import aboutPage from '../../app/pages/about_page/about_page_reducer';

export default combineReducers({
  routing,

  config,
  status,

  indexPage,
  aboutPage,
});
