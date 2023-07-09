import React, { Component } from 'react';
import css from './FormContact.module.css';
import PropTypes from 'prop-types';

export class FormContact extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onAddContact(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.wrapper}>
        <label className={css.formlabel}>
          Name
          <input
            className={css.forminput}
            onChange={this.handleInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={this.state.name}
            required
          />
        </label>

        <label className={css.formlabel}>
          Number
          <input
            className={css.forminput}
            onChange={this.handleInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={this.state.number}
            required
          />
        </label>

        <button type="submit" className={css.formbtn}>
          add contact
        </button>
      </form>
    );
  }
}

FormContact.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
