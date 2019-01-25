import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import TextField from "../TextField";
import Checkbox from "../Checkbox";
import Button from "../Button";
import "./AppBar.scss";
import ModalCreate from "../ModalCreate";

class AppBar extends Component {
  static propTypes = {
    createProject: PropTypes.func.isRequired,
    onlyOpened: PropTypes.bool.isRequired,
    toggleOnlyOpened: PropTypes.func.isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired
  };

  state = {
    openModal: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { onlyOpened, searchQuery } = this.props;
    const { openModal } = this.state;
    
    if (nextProps.onlyOpened !== onlyOpened) return true
    if (nextProps.searchQuery !== searchQuery) return true

    if (nextState.openModal !== openModal) return true

    return false
  }

  handleChange = (event) => {
    const { value } = event.target;
    const { updateSearchQuery } = this.props;

    updateSearchQuery(value);
  };

  handleChangeCheckbox = (event) => {
    const { checked } = event.target;
    const { toggleOnlyOpened } = this.props;
    toggleOnlyOpened(checked)
  };

  handleSubmit = title => {
    this.props.createProject(title)
  };

  modalOpen = () => {
    this.setState({
      openModal: true
    })
  };

  modalClose = () => {
    this.setState({
      openModal: false
    })
  };

  render() {
    const { openModal } = this.state;
    const { className, onlyOpened, searchQuery } = this.props;

    return (
      <Fragment>
        <div className={`sj-appbar ${className}`}>
          <TextField
            value={searchQuery}
            onChange={this.handleChange}
            placeholder="Поиск по вакансиям"
          />
          <Checkbox
            value={Boolean(onlyOpened)}
            onChange={this.handleChangeCheckbox}
            label="Только открытые"
          />
          <Button variant="action" onClick={this.modalOpen}>Добавить проект</Button>
        </div>
        { openModal && (
          <ModalCreate
            title="Новый проект"
            placeholder="Название проекта"
            onSubmit={this.handleSubmit}
            onClose={this.modalClose}
          />
        )}
      </Fragment>
    )
  }
}

export default AppBar
