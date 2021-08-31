import axios from 'axios';
import * as contactsAction from './contactsAction';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const fetchContactsOnServer = () => async dispatch => {
  dispatch(contactsAction.fetchContactsRequest());
  try {
    const { data } = await axios('/contacts');

    dispatch(contactsAction.fetchContactsSuccess(data));
  } catch (error) {
    dispatch(contactsAction.fetchContactsError(error.message));
  }
};

const fetchPostContactOnServer = dataContact => async dispatch => {
  dispatch(contactsAction.fetchContactsRequest());
  try {
    const { data } = await axios.post('/contacts', dataContact);
    dispatch(contactsAction.addContact(data));
  } catch (error) {
    dispatch(contactsAction.fetchContactsError(error));
  }
};

const fetchDeleteContactOnServer = id => async dispatch => {
  dispatch(contactsAction.fetchContactsRequest());
  try {
    await axios.delete(`/contacts/${id}`);

    dispatch(contactsAction.deleteContact(id));
  } catch (error) {
    dispatch(contactsAction.fetchContactsError(error));
  }
};
const contactsOperation = {
  fetchContactsOnServer,
  fetchPostContactOnServer,
  fetchDeleteContactOnServer,
};
export default contactsOperation;
