import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../Input';
import { filterContacts } from '../../redux/contactsRedux/contactsAction';
import Styles from './Filter.module.css';

const Filter = ({ onChangeInputByFilter }) => {
  const [state, setState] = useState('');
  const items = useSelector(state => state.contacts.items);
  const onChangeInput = ({ target: { value } }) => {
    setState(value);
    onChangeInputByFilter(value);
  };

  if (!items.length) {
    return null;
  }
  return (
    <div className={Styles.Container}>
      <Input
        value={state}
        name="search"
        placeholder="Найти контакт"
        onChangeInput={onChangeInput}
      />
    </div>
  );
};

Filter.propTypes = {
  onChangeInputByFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onChangeInputByFilter: value => dispatch(filterContacts(value)),
});

export default connect(null, mapDispatchToProps)(Filter);
