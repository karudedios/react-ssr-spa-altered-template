import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { renderRoutes } from 'react-router-config';
import Switch from 'react-router/Switch';
import Route from 'react-router/Route';
import { connect } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import Header from './../../components/header/header';
import Config from './../../components/config/config';
import log from '../../../services/logger_service';

const renderRoutes = (routes, location) =>
  routes ? (
    <Switch key={location.key} location={location}>
      {routes.map(route => (
        <Route
          key={location.key}
          location={location}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          component={route.component}
        />
      ))}
    </Switch>
  ) : null;

class Layout extends Component {
  livereload() {
    if (this.props.env === 'development') {
      return <script src="//localhost:35729/livereload.js" async />;
    }
    return '';
  }

  scriptbundle(env) {
    if (env === 'development') {
      // return <script src="/js/bundle.js" async></script>;
      return [
        <script key="vendor" src="//localhost:3001/static/vendor.js" defer />,
        <script key="bundle" src="//localhost:3001/static/bundle.js" defer />
      ];
    }

    if (env === 'test') {
      return [
        <script
          key="vendor"
          src={`/js/${this.props.manifestJSON['vendor.js']}`}
          defer
        />,
        <script
          key="bundle"
          src={`/js/${this.props.manifestJSON['app.js']}`}
          defer
        />
      ];
    }

    return [
      <script
        key="vendor"
        src={`${this.props.staticVendorUrl}/${
          this.props.manifestJSON['vendor.js']
        }`}
        defer
      />,
      <script
        key="bundle"
        src={`${this.props.staticBundleUrl}/js/${
          this.props.manifestJSON['app.js']
        }`}
        defer
      />
    ];
  }

  render() {
    return (
      <body className="layout">
        <Header />

        <ErrorBoundary
          onError={(error, componentStack) => {
            log.error(componentStack, error);
          }}
          fallbackcomponent={<div>Error</div>}
        >
          <TransitionGroup
            enter={true}
            exit={true}
            appear={true}
            className="main"
            role="main"
            component="main"
          >
            <CSSTransition
              key={this.props.location.pathname}
              classNames="fadeTranslate"
              timeout={1000}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              {renderRoutes(this.props.route.routes, this.props.location)}
            </CSSTransition>
          </TransitionGroup>
        </ErrorBoundary>
        {this.livereload()}
        <Config />
        {this.scriptbundle(this.props.env)}
      </body>
    );
  }
}

function mapStateToProps(state) {
  return {
    env: state.config.env,
    manifestJSON: state.config.manifestJSON,
    staticVendorUrl: state.config.staticVendorUrl,
    staticBundleUrl: state.config.staticBundleUrl
  };
}

Layout.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  env: PropTypes.string.isRequired,
  manifestJSON: PropTypes.shape({
    'vendor.js': PropTypes.string,
    'app.js': PropTypes.string
  }).isRequired,
  staticBundleUrl: PropTypes.string.isRequired,
  staticVendorUrl: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    key: PropTypes.string
  }).isRequired
};

Layout.defaultProps = {
  route: {
    routes: []
  },
  env: 'development'
};

export default connect(mapStateToProps)(Layout);
