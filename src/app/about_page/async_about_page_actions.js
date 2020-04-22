import Promise from 'bluebird';
import * as aboutPageActions from './about_page_action_creators';
import notFoundActionCreator from '../../redux/action_creators/not_found_status_action_creator';
import log from '../../services/logger_service';

export default function fetchAboutData(params, dispatch, state) {
  dispatch(aboutPageActions.aboutPageLoading());
  return Promise.all([
    // This is a static page, but if you needed data
  ])
    .then(function handleIndexPageDataLoaded() {
      dispatch(aboutPageActions.aboutPageLoaded());
    })
    .catch(function handleUserError(err) {
      log.error(err, 'Error in fetching repo detail page.');
      dispatch(notFoundActionCreator(500, 'ERROR_STATUS'));
      dispatch(aboutPageActions.aboutPageLoadError(err, state));
    });
}
