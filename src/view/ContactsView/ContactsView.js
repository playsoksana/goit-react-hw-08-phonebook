import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from './ContactList.module.css';
import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";
import ButtonBlack from 'components/Button/Button';
import Filter from 'components/Filter';
import krik from 'icon/krik.jpg';
import { contactsOperation, contactsSelector } from '../../redux/contactsRedux';
import Contact from '../../components/Contact';



const override = css`
  display: block;
  margin: 50px;
  border-color: red;
`;


const ContactsView = ({ toggleIsVisible }) => {
  const { items } = useSelector(contactsSelector.getContacts);
  const filteredItems = useSelector(contactsSelector.visibleItems);
  const isLoading = useSelector(contactsSelector.getIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperation.fetchContactsOnServer());
  }, [dispatch]);

  return (
    <>
      <ButtonBlack text-aria="add contact" onClick={toggleIsVisible}>
        Добавить контакт
      </ButtonBlack>
      {isLoading ? (
        <PacmanLoader className={styles.Spinner} color='green' loading={isLoading} css={override} size={35} />

      ) : (
        <>
          {' '}
          {items.length > 1 && <Filter />}
          {filteredItems.length && (
            <ul className={styles.contacts}>
              {filteredItems.map(({ name, number, id }) => (
                <Contact key={id} name={name} number={number} id={id} />
              ))}
            </ul>
          )}
          {!items.length &&  
            <>
              <p className={styles.notification}>"The phone book is empty"</p>{' '}
              <img src={krik} alt="a cat"></img>
            </>
          }
          {!filteredItems.length && 
            <p className={styles.notification}>
              There is no such name in the database{' '}
            </p>
          }
        </>
      )}
    </>
  );
};

export default connect()(ContactsView);
