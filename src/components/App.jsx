import React, { useState, useEffect } from 'react';
import { FormContact } from './FormContact/FormContact';
import { Filter } from './Filter/Filter';
import { ListContacts } from './ListContacts/ListContacts';
import { nanoid } from 'nanoid';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filters, setFilters] = useState('');

  const onAddContact = ({ name, number }) => {
    const checkedContact = contacts.find(el => el.name === name);
    if (checkedContact) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts(prevContacts => [
        {
          name,
          number,
          id: nanoid(),
        },
        ...prevContacts,
      ]);
    }
  };

  const filterByName = () => {
    const arr = contacts.filter(el => el.name.includes(filters));
    return arr;
  };

  const updateFilter = data => {
    setFilters(data);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  useEffect(() => {
    const stringifiedContact = localStorage.getItem('contact');
    const contactsLocal = JSON.parse(stringifiedContact) ?? [];
    setContacts(contactsLocal);
  }, []);

  useEffect(() => {
    const stringifiedContact = JSON.stringify(contacts);
    localStorage.setItem('contact', stringifiedContact);
  }, [contacts]);

  return (
    <div className={css.appwrap}>
      <h2>Phonebook</h2>
      <FormContact onAddContact={onAddContact} />
      <h2>Contacts</h2>
      <Filter state={filters} updateFilter={updateFilter} />
      {filters === '' ? (
        <ListContacts state={contacts} deleteContact={deleteContact} />
      ) : (
        <ListContacts state={filterByName()} deleteContact={deleteContact} />
      )}
    </div>
  );
};

export default App;
