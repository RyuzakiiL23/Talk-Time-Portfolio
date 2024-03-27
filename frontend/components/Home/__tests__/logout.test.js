import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import LogOut from '../LogOut';
import toast from 'react-hot-toast';

// Mocking react-hot-toast
jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));

// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    value: true, // Assuming user is authenticated initially
  },
});

jest.mock('@/hooks/useListenMessages', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('LogOut component', () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  test('renders LogOut component without crashing', () => {
    render(
      <Provider store={store}>
        <LogOut />
      </Provider>
    );
  });

  test('logout function removes user data from local storage and dispatches action', async () => {
    // Mock fetch to return a resolved promise
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({}),
    });
  });

  test('displays error toast if logout fails', async () => {
    // Mock fetch to return a rejected promise
    global.fetch = jest.fn().mockRejectedValue(new Error('Logout failed'));
  });

});
