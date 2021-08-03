import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ReduxState } from '../store';

const mockStore = configureMockStore([thunk]);

interface Props {
  initialState: ReduxState;
}

const Root: React.FC<Props> = ({ children, initialState = {} }) => {
  return <Provider store={mockStore(initialState)}>{children}</Provider>;
};

export default Root;
