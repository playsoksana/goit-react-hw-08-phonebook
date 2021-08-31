import React, { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { connect, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from './Form/Form';

import ContactsView from '../view/ContactsView/ContactsView';
import { useDispatch } from 'react-redux';

import Modal from './Modal/Modal';

import { contactsSelector } from 'redux/contactsRedux';
import * as authSelector from 'redux/authRedux/authSelector';
import { Route, Switch } from 'react-router-dom';
import Header from 'components/Header';
import RegisterView from 'view/RegisterView';
import LoginView from 'view/LoginView';

import * as authOperation from '../redux/authRedux/authOperation';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

const App = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector(contactsSelector.getItems);
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
  }, [dispatch]);

  return (
    !isLoader && (
      <>
        <Header />
        <Suspense fallback={<p>Загружаем.....</p>}>
          <Switch>
            <Route exact path="/">
              <div>home</div>
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
        <Modal
          toggleIsVisible={toggleIsVisible}
          isVisibleModal={isVisibleModal}
        >
          <Form setIsVisibleModal={setIsVisibleModal} />
        </Modal>
      </>
    )
  );
};

export default connect()(App);
