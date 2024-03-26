import React from "react";
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import LogOut from '../LogOut';
import { notAuthentificated } from '../../../lib/Features/Auth/authSlice';

// Mock the redux store
const store = createStore(() => ({
  auth: { value: null },
}));

// Mock localStorage
Storage.prototype.getItem = jest.fn(() => 'chat-user');
Storage.prototype.removeItem = jest.fn();

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ error: null }),
  })
);

// Mock window.location.reload
delete window.location;
window.location = { reload: jest.fn() };

describe('LogOut component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <LogOut />
      </Provider>
    );
  });

  it('calls logout function on click', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <LogOut />
      </Provider>
    );

    fireEvent.click(getByRole('button'));

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('chat-user');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
