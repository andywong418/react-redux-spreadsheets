import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import Home from './Home';
import { Route } from 'react-router-dom';
import AnotherPage from '../components/AnotherPage';
import {ConnectedRouter} from 'react-router-redux';
import {withRouter} from 'react-router';
import Table from '../components/Table';

const HomeWrapper = ({name}) => {
  return (
    <Home name={name} />
  )
}
const App = ({ name, data, updateCell }) => {
    return (
        <div>
            <Table/>
        </div>
    );
};
const NonBlockApp = withRouter(App);
const AppContainer = ({history, store, name}) => {
  return(
    <div>
          <ConnectedRouter history={history}>
            <NonBlockApp />
          </ConnectedRouter>
    </div>
  )
}
AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.rootReducer.name
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
