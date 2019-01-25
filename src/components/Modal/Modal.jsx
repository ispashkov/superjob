import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Heading from "../Heading";
import Button from "../Button";
import { ReactComponent as CloseIcon } from "../../assets/close.svg"
import "./Modal.scss";

import ClickOutside from "../../hocs/ClickOutside";

export default class Modal extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    const { title, onClose } = this.props;

    return (

      <div className="sj-modal-overlay">
        <ClickOutside handler={onClose}>
          <div className="sj-modal">
            <div className="sj-modal-header">
              <Heading className="sj-modal__title" variant="3">{ title }</Heading>
              <Button className="sj-modal__close" onClick={onClose}>
                <CloseIcon />
              </Button>
            </div>
            <div className="sj-modal-content">
              { this.props.children }
            </div>
          </div>
        </ClickOutside>
      </div>
    )
  }
}
