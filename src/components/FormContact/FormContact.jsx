import React, { useState } from 'react';
import css from './FormContact.module.css';
import PropTypes from 'prop-types';

export const FormContact = ({ onAddContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAddContact(formData);

    reset();
  };

  const reset = () => {
    setFormData({
      name: '',
      number: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.wrapper}>
      <label className={css.formlabel}>
        Name
        <input
          className={css.forminput}
          onChange={handleInputChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={formData.name}
          required
        />
      </label>

      <label className={css.formlabel}>
        Number
        <input
          className={css.forminput}
          onChange={handleInputChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={formData.number}
          required
        />
      </label>
      <button type="submit" className={css.formbtn}>
        add contact
      </button>
    </form>
  );
};

FormContact.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
