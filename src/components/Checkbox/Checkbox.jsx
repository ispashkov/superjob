import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Checkbox.scss"

export default class Checkbox extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string
  };

  render() {
    const { value, onChange, name, label } = this.props;

    return (
      <label className="sj-checkbox">
        <input
          type="checkbox"
          name={name}
          onChange={onChange}
          checked={Boolean(value)}
          className="sj-checkbox__input"
        />
        <span className={classNames("sj-checkbox__box", {
          "sj-checkbox__box_checked": value
        })}></span>
        <span className="sj-checkbox__label">{label}</span>
      </label>
    );
  }
}