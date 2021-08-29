import { useState, useEffect } from 'react';
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
import { NavLink, Route, Switch } from 'react-router-dom';
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
  const isLoading = useSelector(authSelector.detIsLoader);
  {
    console.log(11111111111111111111, isLoading);
  }

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
    !isLoading && (
      <>
        <Header />
        <Switch>
          {/* <Suspense fallback={<p>Загружаем.....</p>}> */}
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
          {/* </Suspense> */}
        </Switch>

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

// if (items.length) {
//   return filteredItems.length ? (
//     <ul className={styles.contacts}>
//       {filteredItems.map(({ name, number, id }) => (
//         <Contact key={id} name={name} number={number} id={id} />
//       ))}
//     </ul>
//   ) : (
//     <p className={styles.notification}>
//       There is no such name in the database{' '}
//     </p>
//   );
// }
// return isLoading ? (
//   <>LOADING...</>
// ) : (
//   <>
//     <p className={styles.notification}>"The phone book is empty"</p>{' '}
//     <img src={krik} alt="a cat and woman"></img>
//   </>
// );
