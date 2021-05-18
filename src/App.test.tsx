import React from 'react';
import * as apolloClient from '@apollo/client';
import { render, screen } from '@testing-library/react';
import {GetReposQuery} from "./utils";
import App from './App';

describe('visual components', () => {
  beforeEach(() => {
    render(<App />);
  })

  it('renders the header', () => {
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
})

describe('querying data',  () => {
  it('fetches the repos data for the default keyword', () => {
    const querySpy = jest.spyOn(apolloClient, 'useQuery');

    render(<App />);

    expect(querySpy).toHaveBeenCalledWith(
      GetReposQuery,
      {
        variables: {
          query: 'react sort:stars',
          first: 10
        },
        skip: false,
      }
    )
  })
})