
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import Login from '../Login';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));


// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    value: false,
  },
});

test('renders Login component without crashing', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
});