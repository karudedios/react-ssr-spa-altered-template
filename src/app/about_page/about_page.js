import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';
import Link from 'react-router-dom/Link';

import loadData from './about_page_data_fetch';

import Footer from '../components/footer/footer';

function AboutPageComponent(props) {
  useEffect(() => {
    if (!get(props, 'state.config.initialPageLoad')) {
      loadData(props.match, props.dispatch, props.state);
    }
  }, []);

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

class AboutPage extends Component {
  componentWillMount() {
    if (!get(this.props, 'state.config.initialPageLoad')) {
      loadData(this.props.match, this.props.dispatch, this.props.state);
    } else {
      // TODO: warm cache for PWA, don't trigger render
    }
  }

  render() {
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
}

AboutPageComponent.propTypes = {
  match: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({}).isRequired
};

AboutPageComponent.defaultProps = {};

function mapStateToProps(state = {}) {
  return {
    state
  };
}

export default withRouter(connect(mapStateToProps)(AboutPageComponent));
