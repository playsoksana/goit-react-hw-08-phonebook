import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Container from './Container/Container';
import ButtonIcon from './Button/ButtonIcon';
import Modal from './Modal/Modal';
import { ReactComponent as AddIcon } from '../icon/plus.svg';
import { contactsSelector } from 'redux/contactsRedux';

const App = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const items = useSelector(contactsSelector.getItems);
  const toggleIsVisible = () =>
    setIsVisibleModal(s => {
      return !s;
    });

  return (
    <section>
      <h1>Phonebook</h1>
      <ButtonIcon
        toggleIsVisible={toggleIsVisible}
        aria="add contact"
        classButton="Icon"
      >
        <AddIcon width="40px" height="40px" />
      </ButtonIcon>
      {items.length > 1 && (
        <Container>
          <Filter />
        </Container>
      )}
      <Container>
        <ContactList />
      </Container>
      <ToastContainer />
      <Modal toggleIsVisible={toggleIsVisible} isVisibleModal={isVisibleModal}>
        <Form setIsVisibleModal={setIsVisibleModal} />
      </Modal>
    </section>
  );
};

export default connect()(App);
