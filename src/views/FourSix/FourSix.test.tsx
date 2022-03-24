import React from 'react';

import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import FourSix from './FourSix';

test('renders header', () => {
  render(
    <HashRouter>
      <FourSix />
    </HashRouter>
  );
  const headerElement = screen.getByText(/4:6 Calculator/i);
  expect(headerElement).toBeInTheDocument();
});
