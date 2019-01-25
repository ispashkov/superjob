import React, { PureComponent } from "react";
import "./Container.scss";

export default class Container extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <div className="sj-container">{children}</div>
    )
  }
}
