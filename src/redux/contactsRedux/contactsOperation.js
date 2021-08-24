import * as contactsAction from './contactsAction';
import * as fetchContacts from '../../helpers/fetchContacts';

const fetchContactsOnServer = () => async dispatch => {
  dispatch(contactsAction.fetchContactsRequest());
  try {
    const result = await fetchContacts.getFetchContacts();

    dispatch(contactsAction.fetchContactsSuccess(result));
  } catch (error) {
    dispatch(contactsAction.fetchContactsError(error));
  }
};

const fetchPostContactOnServer = data => async dispatch => {
  dispatch(contactsAction.fetchContactsRequest());
  try {
    const result = await fetchContacts.postFetchContacts(data);
    dispatch(contactsAction.addContact(result));
  } catch (error) {
    dispatch(contactsAction.fetchContactsError(error));
  }
};

const fetchDeleteContactOnServer = id => async dispatch => {
  dispatch(contactsAction.fetchContactsRequest());
  try {
    await fetchContacts.deleteFetchContacts(id);

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
