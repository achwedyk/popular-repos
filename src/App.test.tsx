import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  render(<App />);
})

test('renders the header', () => {
  const element = screen.getByText(/Popular Repos/i);
  expect(element).toBeInTheDocument();
});

describe('search box', () => {
  it('has the label', () => {
    const element = screen.getByText(/Search keyword/i);
    expect(element).toBeInTheDocument();
  });

  it('is filled with the default value', () => {
    const element = screen.getByDisplayValue(/react/i);
    expect(element).toBeInTheDocument();
  });
})