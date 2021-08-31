import { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button';
import styles from './Form.module.css';
import Input from '../Input';
import PropTypes from 'prop-types';
import notify from 'helpers/notify';
import { contactsOperation, contactsSelector } from '../../redux/contactsRedux';

const Form = ({ setIsVisibleModal }) => {
  const [state, setState] = useState({ name: '', number: '' });
  const items = useSelector(contactsSelector.getItems);
  const dispatch = useDispatch();

  const onChangeInput = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const addContactOnPhonebook = ev => {
    ev.preventDefault();
    const {
      target: { name, number },
    } = ev;
    if (
      items.find(user => user.name.toLowerCase() === name.value.toLowerCase())
    ) {
      return notify(name.value.toUpperCase());
    }

    setIsVisibleModal(false);
    dispatch(
      contactsOperation.fetchPostContactOnServer({
        name: name.value,
        number: number.value,
        id: uuidv4(),
      }),
    );

    clearInput();
  };

  function clearInput() {
    setState({ name: '', number: '' });
  }

  return (
    <form className={styles.Form} onSubmit={addContactOnPhonebook}>
      <div className={styles.Container}>
        <Input
          id="name"
          value={state.name}
          placeholder=" "
          onChangeInput={onChangeInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          textLabel="name"
        />
      </div>

      <div className={styles.Container}>
        <Input
          id="number"
          value={state.number}
          placeholder=" "
          onChangeInput={onChangeInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          textLabel="number"
        />
      </div>
      <div className={styles.Button}>
        <Button type="onClick">Add contact</Button>
      </div>
    </form>
  );
};

Form.propTypes = {
  setIsVisibleModal: PropTypes.func.isRequired,
};

export default connect()(Form);
