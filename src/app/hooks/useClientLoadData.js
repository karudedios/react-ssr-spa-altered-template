import get from 'lodash/get';
import { useEffect } from 'react';

/**
 * Hook that ensures for a given component we determine if a data load is
 * necessary depending on whether or not the component was rendered from client or server
 *
 * @param {Object} props Props containing { match, dispatch, state }
 * @param {Function} loadDataFn Function to invoke the action from
 *
 * @example
 * // user_list_action_creators.js
 * export const userListLoading = () => ({
 *  type: 'USER_LIST_LOADING',
 *  payload: { isLoading: true }
 * });
 *
 * export const userListLoaded = (users = []) => ({
 *  type: 'USERS_LOADED',
 *  payload: { isLoading: false, users }
 * });
 *
 * export const userListLoaded = (err) => ({
 *  type: 'USERS_ERROR',
 *  payload: { isLoading: false, err }
 * });
 *
 * // user_list_actions.js
 * import { userListLoading, userListLoaded, userListError } from './user_action_creators';
 *
 * export const fetchUserList = async (queryParams, dispatch, state) => {
 *  dispatch(userListLoading());
 *
 *  try {
 *    const response = await fetch('https://jsonplaceholder.com/api/users');
 *    const users = await response.json();
 *
 *    dispatch(userListLoaded(users));
 *  }
 *  catch(e) {
 *    dispatch(userListLoaded(e));
 *  }
 * }
 *
 * // user_list.js
 * import { fetchUserList } from './user_action_creators';
 *
 * function UserList(props) {
 *  // this will only be executed when we render UserList from the client
 *  // if we enter directly from the server this is skipped, given that the same data
 *  // is fetched in the Server and returned with the markup so we don't have to do it again.
 *  useLoadData(props, fetchUserList);
 *
 *  // do things based on props.isLoading, propUsers and prop.error
 * }
 *
 * const mapStateToProps = (state) => ({
 *  error: state.userList.error,
 *  users: state.userList.users,
 *  isLoading: state.userList.isLoading,
 * });
 *
 * export default withRouter(connect(mapStateToProps)(UserList));
 */
export const useClientLoadData = (props, loadDataFn) => {
  useEffect(() => {
    // This flag is `true` whenever you're rendering from the server
    if (!get(props, 'state.config.initialPageLoad')) {
      loadDataFn(props.match, props.dispatch, props.state);
    }
  }, []);
};
