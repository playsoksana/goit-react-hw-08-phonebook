import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import * as authOperation from '../../redux/authRedux/authOperation';
import styles from './Login.module.css';

const LoginView = () => {
  const dispatch = useDispatch();

  const onSubmit = ev => {
    ev.preventDefault();
    const {
      target: { email, password },
    } = ev;
    const data = {
      email: email.value,
      password: password.value,
    };
    dispatch(authOperation.login(data));
  };

  return (
    <>
      <Form className={styles.Form} onSubmit={onSubmit}>
        <h2 className={styles.Text}>Авторизация</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control type="email" placeholder="Введите почту" name="email" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            name="password"
          />
        </Form.Group>

        <Button className={styles.Button} variant="dark" type="submit">
          Отправить
        </Button>
      </Form>
    </>
  );
};

export default LoginView;
