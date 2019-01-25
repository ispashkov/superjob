import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClickOutside extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    handler: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handler()
    }
  };

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  };
}
