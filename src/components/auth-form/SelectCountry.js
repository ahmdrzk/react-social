import classes from "./SelectCountry.module.css";

import countries from "../../lib/countries-list.json";

const SelectCountry = ({ onChange, onBlur, error }) => {
  return (
    <div>
      <label htmlFor="country" className="visually-hidden">
        Country
      </label>
      <select id="country" name="country" onChange={onChange} onBlur={onBlur} className={classes.select}>
        <option value="">Country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name} {country.emoji}
          </option>
        ))}
      </select>
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
};

export default SelectCountry;
