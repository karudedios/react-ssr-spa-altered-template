import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';
import Link from 'react-router-dom/Link';

import fetchAboutPageData from './about_page_data_fetch';
import Footer from '../components/footer/footer';
import { useClientLoadData } from '../hooks/useClientLoadData';

function AboutPage(props) {
  useClientLoadData(props, fetchAboutPageData);

  return (
    <div className="about-page">
      <h1>What's this about?</h1>

      <p>
        This project aims to do one thing well: make server side rendering
        simple in a react application using only mature community maintained
        libraries.
        <Link to="/repo/michaelBenin/react-ssr-spa">demo: react-ssr-spa</Link>
      </p>

      <Footer />
    </div>
  );
}

// You'll have these 3 props always, what changes is the values they havae depending
// on whether or not you're rendering from the server or the client
AboutPage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({}).isRequired
};

AboutPage.defaultProps = {};

function mapStateToProps(state = {}) {
  return {
    state
  };
}

export default withRouter(connect(mapStateToProps)(AboutPage));
