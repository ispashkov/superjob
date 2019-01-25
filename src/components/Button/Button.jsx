import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames"
import "./Button.scss";

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(["button", "submit"]),
    variant: PropTypes.oneOf(["primary", "action"]),
  };

  static defaultProps = {
    type: "button"
  };

  render() {
    const { type, variant, children, className, ...ownProps } = this.props;

    return (
      <button
        type={type}
        className={classNames("sj-btn", {
          "sj-btn_primary": variant === "primary",
          "sj-btn_action": variant === "action"
        }) + ` ${className}`}
        {...ownProps}
      >
        {children}
      </button>
    );
  }
}
