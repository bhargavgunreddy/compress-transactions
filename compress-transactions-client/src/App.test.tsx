import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { setupServer } from 'msw/node';
import { rest } from 'msw'

const server = setupServer(
  rest.get('/login', (req, res, ctx) => {
    return res(ctx.json({ success: 'success' }))
  }),
)

test('renders The login component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

