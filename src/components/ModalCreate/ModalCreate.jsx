import React, { PureComponent } from "react";
import Modal from "../Modal";
import TextField from "../TextField";
import Button from "../Button";
import "./ModalCreate.scss";

export default class ModalCreate extends PureComponent {
  state = {
    name: "",
    hasError: false
  };

  handleChange = event => {
    const { target: { value } } = event;
    this.setState({
      name: value,
      hasError: false
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit, onClose } = this.props;
    const { name } = this.state;

    if (name.length < 3) {
      return this.setState({
        hasError: true
      })
    }

    onSubmit(name);

    this.setState({
      name: ""
    });

    onClose()
  };

  render() {
    const { name, hasError } = this.state;
    const { title, onClose, placeholder } = this.props;

    return (
      <Modal title={title} onClose={onClose} className="sj-modal-create">
        <form className="sj-modal-create-form" onSubmit={this.handleSubmit}>
          <TextField
            className="sj-modal-create__input"
            onChange={this.handleChange}
            value={name}
            placeholder={placeholder}
            hasError={hasError}
            errorMsg="Значение не должно быть короче 3-х символов."
          />
          <Button
            className="sj-modal-create__submit"
            type="submit"
            variant="action"
          >
            Создать
          </Button>
        </form>
      </Modal>
    )
  }
}
