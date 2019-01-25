import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Heading.scss";

export default class Heading extends PureComponent {
  static propTypes = {
    variant: PropTypes.string,
  };

  static defaultProps = {
    variant: "1"
  };

  render() {
    const { variant, children, className } = this.props;

    const Tag = variant > 6 ? 'h6' : `h${variant}`;
    const cssClasses = `sj-heading sj-heading_h${variant} ${className}`;

    return (
      <Tag className={cssClasses}>{children}</Tag>
    )
  }
}
