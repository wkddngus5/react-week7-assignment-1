import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  changeLoginField,
  requestLogin,
  setAccessToken,
} from './actions';

import LoginForm from './LoginForm';

import { get } from './utils';

function LogoutForm({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      Log Out
    </button>
  );
}

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { email, password } = useSelector(get('loginFields'));
  const accessToken = useSelector(get('accessToken'));

  function handleChange({ name, value }) {
    dispatch(changeLoginField({ name, value }));
  }

  function handleSubmit() {
    dispatch(requestLogin());
  }

  function handleClickLogOut() {
    dispatch(setAccessToken(''));
  }

  return (
    <>
      {accessToken ? (
        <LogoutForm onClick={handleClickLogOut} />
      ) : (
        <LoginForm
          fields={{ email, password }}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      )}

    </>
  );
}
