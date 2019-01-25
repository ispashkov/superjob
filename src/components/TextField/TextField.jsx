import React, { PureComponent } from "react"
import PropTypes from "prop-types";
import classNames from "classnames";
import "./TextField.scss";

export default class TextField extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    hasError: PropTypes.bool,
    errorMsg: PropTypes.string
  };

  static defaultProps = {
    hasError: false
  };

  render() {
    const { value, name, onChange, hasError, errorMsg, placeholder, className } = this.props;

    return (
      <div className={`sj-field ${className}`}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classNames("sj-field__input", {
            "sj-field__input_invalid": hasError
          })}
        />
        { hasError && <div className="sj-field__error">{ errorMsg }</div>}
      </div>
    );
  }
}
