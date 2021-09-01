import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('contact/addContact');
export const deleteContact = createAction('contact/deleteContact');
export const filterContacts = createAction('contact/filterContacts');
export const isEmpty = createAction('contacts/isEmpty');

export const fetchContactsRequest = createAction(
  'contacts/fetchContactsRequest',
);
export const fetchContactsSuccess = createAction(
  'contacts/fetchContactsSuccess',
);
export const fetchContactsError = createAction('contacts/fetchContactsError');
