import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';
import { contactsOperation } from '../../redux/contactsRedux';

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const onDeleteContact = () => {
    dispatch(contactsOperation.fetchDeleteContactOnServer(id));
  };
  return (
    <li className={styles.item}>
      <p className={styles.name}>{name}:</p>
      <p className={styles.number}>{number}</p>

      <button className={styles.button} onClick={onDeleteContact} type="button">
        Delete contact
      </button>
    </li>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect()(Contact);
