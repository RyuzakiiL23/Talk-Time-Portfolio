import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import Login from '../Login';
import toast from 'react-hot-toast';

// mock the next/image to avoid errros
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

// test if the app is rendered without crashing
test('renders Login component without crashing', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
});

// test for username
test('allows the user to type into the username field', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const usernameField = getByLabelText('Username');
  fireEvent.change(usernameField, { target: { value: 'testuser' } });
  expect(usernameField.value).toBe('testuser');
});

// test for password
test('allows the user to type into the password field', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const passwordField = getByLabelText('Password');
  fireEvent.change(passwordField, { target: { value: 'testpassword' } });
  expect(passwordField.value).toBe('testpassword');
});

// mocks react-hot -toast error
jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));


