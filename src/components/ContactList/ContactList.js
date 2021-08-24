import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from './ContactList.module.css';

import krik from 'icon/krik.jpg';
import { contactsOperation, contactsSelector } from '../../redux/contactsRedux';
import Contact from '../Contact/Contact';

const ContactList = () => {
  const { items } = useSelector(contactsSelector.getContacts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contactsOperation.fetchContactsOnServer());
  }, [dispatch]);

  const filteredItems = useSelector(contactsSelector.visibleItems);
  const isLoading = useSelector(contactsSelector.getIsLoading);

  if (items.length) {
    return filteredItems.length ? (
      <ul className={styles.contacts}>
        {filteredItems.map(({ name, number, id }) => (
          <Contact key={id} name={name} number={number} id={id} />
        ))}
      </ul>
    ) : (
      <p className={styles.notification}>
        There is no such name in the database{' '}
      </p>
    );
  }
  return isLoading ? (
    <>LOADING...</>
  ) : (
    <>
      <p className={styles.notification}>"The phone book is empty"</p>{' '}
      <img src={krik} alt="a cat and woman"></img>
    </>
  );
};

export default connect()(ContactList);
