import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
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


test('initial state of username and password fields is empty', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(screen.getByLabelText('Username').value).toBe('');
  expect(screen.getByLabelText('Password').value).toBe('');
});

test('password visibility toggle works correctly', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const passwordField = screen.getByLabelText('Password');
  const toggleButton = screen.getByRole('button');
});

test('username and password fields update their state when text is entered', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const usernameField = screen.getByLabelText('Username');
  const passwordField = screen.getByLabelText('Password');

  fireEvent.change(usernameField, { target: { value: 'testuser' } });
  fireEvent.change(passwordField, { target: { value: 'testpass' } });

  expect(usernameField.value).toBe('testuser');
  expect(passwordField.value).toBe('testpass');
});
