import React, { Component } from 'react';
import { FormContact } from './FormContact/FormContact';
import { Filter } from './Filter/Filter';
import { ListContacts } from './ListContacts/ListContacts';
import { nanoid } from 'nanoid';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
    ],
    filters: '',
  };

  onAddContact = ({ name, number }) => {
    const checkedContact = this.state.contacts.find(el => el.name === name);

    if (checkedContact) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [
          {
            name,
            number,
            id: nanoid(),
          },
          ...prevState.contacts,
        ],
      }));
    }
  };

  filterByName = () => {
    const { contacts, filters } = this.state;
    const arr = contacts.filter(el => el.name.includes(filters));
    return arr;
  };

  updateFilter = data => {
    this.setState({ filters: data });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const stringifiedContact = localStorage.getItem('contact');
    const contacts = JSON.parse(stringifiedContact) ?? [];

    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContact = JSON.stringify(this.state.contacts);
      localStorage.setItem('contact', stringifiedContact);
    }
  }

  render() {
    return (
      <div className={css.appwrap}>
        <h2>Phonebook</h2>
        <FormContact onAddContact={this.onAddContact} />
        <h2>Contacts</h2>
        <Filter state={this.state.filters} updateFilter={this.updateFilter} />
        {this.state.filters === '' ? (
          <ListContacts
            state={this.state.contacts}
            deleteContact={this.deleteContact}
          />
        ) : (
          <ListContacts
            state={this.filterByName()}
            deleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}

export default App;
