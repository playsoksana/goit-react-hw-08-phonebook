import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import PacmanLoader from 'react-spinners/PacmanLoader';
import { css } from '@emotion/react';

import styles from './ContactList.module.css';

import ButtonBlack from 'components/Button/Button';
import Filter from 'components/Filter';
import krik from 'icon/krik.jpg';
import { contactsOperation, contactsSelector } from '../../redux/contactsRedux';
import * as authSelector from '../../redux/authRedux/authSelector';
import Contact from '../../components/Contact';

const override = css`
  display: block;
  margin: 50px;
  border-color: red;
`;

const ContactsView = ({ toggleIsVisible }) => {
  const { items } = useSelector(contactsSelector.getContacts);
  const filteredItems = useSelector(contactsSelector.visibleItems);
  const dispatch = useDispatch();
  const isLoader = useSelector(authSelector.getIsLoader);
  const isEmpty = useSelector(contactsSelector.getIsEmpty);
  //???????????????????????????????????????????????????????????????????????????????????????
  //const isLoading = useSelector(contactsSelector.getIsLoading);

  useEffect(() => {
    dispatch(contactsOperation.fetchContactsOnServer());
  }, [dispatch]);

  return (
    <>
      <ButtonBlack type="button" onClick={toggleIsVisible}>
        Добавить контакт
      </ButtonBlack>
      {/* {isLoader   ? <PacmanLoader
          className={styles.Spinner}
          color="green"
          loading={isLoader}
          css={override}
          size={35}
        /> : null} */}

      {items.length > 1 && <Filter />}

      {filteredItems.length ? (
        <ul className={styles.contacts}>
          {filteredItems.map(({ name, number, id }) => (
            <Contact key={id} name={name} number={number} id={id} />
          ))}
        </ul>
      ) : null}

      {isEmpty && (
        <>
          <p className={styles.notification}>"The phone book is empty"</p>{' '}
          <img src={krik} alt="a cat"></img>
        </>
      )}

      {!filteredItems.length && (
        <p className={styles.notification}>
          There is no such name in the database{' '}
        </p>
      )}
    </>
  );
};

export default connect()(ContactsView);
