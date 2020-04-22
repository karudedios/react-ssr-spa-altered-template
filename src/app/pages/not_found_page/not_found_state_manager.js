import { canUseDOM } from 'exenv';
import notFoundActionCreator from './not_found_status_action_creator';

export default function handleNotFound(match, dispatch) {
  if (canUseDOM) {
    return false;
  }
  dispatch(notFoundActionCreator(404, 'NOT_FOUND_STATUS'));
  return false;
}
