import { createSelector } from '@reduxjs/toolkit';

const getContacts = state => state.contacts;
const getItems = state => state.contacts.items;
const getFilter = state => state.contacts.filter;
const getIsLoading = state => state.contacts.isLoading;

const visibleItems = createSelector([getItems, getFilter], (items, filter) =>
  items.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase())),
);

export { getContacts, getItems, getFilter, getIsLoading, visibleItems };
