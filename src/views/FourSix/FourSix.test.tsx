import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './FourSix';

test('renders learn react link', () => {
  render(<App />);
  const headerElement = screen.getByText(/4:6 Brewing Method Calculator/i);
  expect(headerElement).toBeInTheDocument();
});
