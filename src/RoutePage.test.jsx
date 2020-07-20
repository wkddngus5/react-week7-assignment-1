import React from 'react';

import {
  MemoryRouter,
} from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RoutePage from './RoutePage';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      regions: [
        { id: 1, name: '서울' },
      ],
      categories: [],
      restaurants: [],
      restaurant: { id: 1, name: '마녀주방' },
      loginFields: {
        email: 'test@example.com',
        password: 'password',
      },
      accessToken: '',
      reviewFields: {
        score: '',
        description: '',
      },
    }));
  });

  function renderRoutePage({ path }) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <RoutePage />
      </MemoryRouter>,
    );
  }

  context('with path /', () => {
    it('renders the home page', () => {
      const { container } = renderRoutePage({ path: '/' });

      expect(container).toHaveTextContent('Home');
    });
  });

  context('with path /about', () => {
    it('renders the about page', () => {
      const { container } = renderRoutePage({ path: '/about' });

      expect(container).toHaveTextContent('About 페이지');
    });
  });

  context('with path /restaurants', () => {
    it('renders the restaurants page', () => {
      const { container } = renderRoutePage({ path: '/restaurants' });

      expect(container).toHaveTextContent('서울');
    });
  });

  context('with path /restaurants/:id', () => {
    it('renders the restaurant page', () => {
      const { container } = renderRoutePage({ path: '/restaurants/1' });

      expect(container).toHaveTextContent('마녀주방');
    });
  });

  context('with path /login', () => {
    it('renders the login page', () => {
      const { container } = renderRoutePage({ path: '/login' });

      expect(container).toHaveTextContent('E-mail');
    });
  });

  context('with invalid path', () => {
    it('renders the not found page', () => {
      const { container } = renderRoutePage({ path: '/xxx' });

      expect(container).toHaveTextContent('Not Found');
    });
  });
});