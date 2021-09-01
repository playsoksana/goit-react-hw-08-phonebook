import React, { useState, useEffect, Suspense } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';
import Form from './Form/Form';
import Modal from './Modal/Modal';
import ContactsView from '../view/ContactsView/ContactsView';
import * as authSelector from 'redux/authRedux/authSelector';
import Header from 'components/Header';
import RegisterView from 'view/RegisterView';
import LoginView from 'view/LoginView';
import * as authOperation from '../redux/authRedux/authOperation';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import kiss from '../icon/kiss.jpg';

const override = css`
  display: block;
  margin: 50px;
  border-color: red;
`;

const App = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(authSelector.getToken);
  const isLoader = useSelector(authSelector.getIsLoader);
  const toggleIsVisible = () =>
    setIsVisibleModal(s => {
      return !s;
    });

  useEffect(() => {
    if (token === null) {
      return;
    }
    dispatch(authOperation.fetchByToken());
  }, [dispatch, token]);

  return isLoader ? (
    <PacmanLoader color="green" loading={isLoader} css={override} size={35} />
  ) : (
    <>
      <Header />
      <Suspense fallback={<p>Загружаем.....</p>}>
        <Switch>
          <Route exact path="/">
            <img src={kiss} width="400px" alt="phone"></img>
          </Route>

          <PrivateRoute exact path="/contacts" urlFToRedirect="/login">
            <ContactsView toggleIsVisible={toggleIsVisible} />
          </PrivateRoute>

          <PublicRoute
            exact
            path="/register"
            urlFToRedirect="/contacts"
            restricted
          >
            <RegisterView />
          </PublicRoute>
          <PublicRoute
            exact
            path="/login"
            urlFToRedirect="/contacts"
            restricted
          >
            <LoginView />
          </PublicRoute>
        </Switch>
      </Suspense>
      <ToastContainer />
      <Modal toggleIsVisible={toggleIsVisible} isVisibleModal={isVisibleModal}>
        <Form setIsVisibleModal={setIsVisibleModal} />
      </Modal>
    </>
  );
};

export default connect()(App);
