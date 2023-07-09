import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css'

export const Filter = ({ state, updateFilter }) => {
  return (
    <label className={css.label}>
      Find contact by name
      <input
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={e => {
          updateFilter(e.currentTarget.value.trim());
        }}
        value={state.filter}
      />
    </label>
  );
};

Filter.propTypes = {
  state: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired,
};
