const BASE_URL = 'http://localhost:3030/contacts';

export const getFetchContacts = async () => {
  try {
    const PromiseResult = await fetch(`${BASE_URL}`);
    const result = await PromiseResult.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const postFetchContacts = async data => {
  try {
    const promiseResult = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await promiseResult.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFetchContacts = async id => {
  try {
    const promiseResult = await fetch(
      `${BASE_URL}/${id}`,

      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const result = await promiseResult.json();

    return result;
  } catch (error) {
    console.log(error.message);
  }
};
