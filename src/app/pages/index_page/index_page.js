import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';

import fetchIndexPageData from './index_page_data_fetch';
import Footer from '../../components/footer/footer';
import { useClientLoadData } from '../../hooks/useClientLoadData';

function IndexPage(props) {
  useClientLoadData(props, fetchIndexPageData);

  return (
    <div className="index-page">
      <h1>Welcome to react-ssr-spa working demo.</h1>

      <Footer />
    </div>
  );
}

IndexPage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({}).isRequired
};

IndexPage.defaultProps = {};

function mapStateToProps(state = {}) {
  return {
    state
  };
}

export default withRouter(connect(mapStateToProps)(IndexPage));
