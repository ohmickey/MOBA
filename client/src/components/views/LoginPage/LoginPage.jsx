import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
import Header from '../../header/Header';
import styles from './LoginPage.module.css';

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      username: Username,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate('/main');
      } else {
        alert('아이디와 비밀번호를 확인해주세요.');
      }
    });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <div className={styles.loginContents}>
            <div className={styles.loginText}>
              <span>로그인</span>
            </div>
            <form className={styles.loginForm} onSubmit={onSubmitHandler}>
              <input
                className={styles.inputs}
                type="username"
                value={Username}
                onChange={onUsernameHandler}
                placeholder="아이디를 입력하세요"
              />
              <input
                className={styles.inputs}
                type="password"
                value={Password}
                onChange={onPasswordHandler}
                placeholder="비밀번호를 입력하세요"
              />
              <br />
              <button className={styles.buttons} type="submit">
                로그인
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth(LoginPage, 'login');
