import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import SignUp from '../SignUp';

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
test('renders SignUp component without crashing', () => {
  render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
});

// test for full name
test('allows the user to type into the full name field', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
  const fullNameField = getByLabelText('Full name');
  fireEvent.change(fullNameField, { target: { value: 'Test User' } });
  expect(fullNameField.value).toBe('Test User');
});


// test for username
test('allows the user to type into the username field', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
  const usernameField = getByLabelText('Username');
  fireEvent.change(usernameField, { target: { value: 'testuser' } });
  expect(usernameField.value).toBe('testuser');
});


// test for email
test('allows the user to type into the email field', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
  const emailField = getByLabelText('Email');
  fireEvent.change(emailField, { target: { value: 'testuser@example.com' } });
  expect(emailField.value).toBe('testuser@example.com');
});


// test for password
test('allows the user to type into the password field', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
  const passwordField = getByLabelText('Password');
  fireEvent.change(passwordField, { target: { value: 'testpassword' } });
  expect(passwordField.value).toBe('testpassword');
});

// test for password confirmation
test('allows the user to type into the password confirmation field', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
  const passwordConfirmationField = getByLabelText('Confirm Password');
  fireEvent.change(passwordConfirmationField, { target: { value: 'testpassword' } });
  expect(passwordConfirmationField.value).toBe('testpassword');
});

test('password visibility toggle works correctly', () => {
  render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );

  const passwordField = screen.getByLabelText('Password');
  const toggleButton = screen.getByRole('button');
});

// test for gender selection
test('allows the user to select gender', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
  const maleRadio = getByLabelText('Male');
  const femaleRadio = getByLabelText('Female');
  fireEvent.click(maleRadio);
  expect(maleRadio.checked).toBe(true);
  fireEvent.click(femaleRadio);
  expect(femaleRadio.checked).toBe(true);
});
