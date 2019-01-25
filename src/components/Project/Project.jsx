import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Heading from "../Heading";
import Button from "../Button";
import ModalCreate from "../ModalCreate";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import "./Project.scss";

import numToStr from "../../helpers/numToStr";


export default class Project extends PureComponent {
  state = {
    open: false,
    openModal: false
  };

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      vacanciesIds: PropTypes.array.isRequired,
      isOpen: PropTypes.bool.isRequired
    }),
    onAdd: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  };

  handleToggle = () => {
    const { data: { vacanciesIds } } = this.props;

    if (!vacanciesIds.length) return;

    this.setState(prevState => ({
      open: !prevState.open
    }))
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  modalOpen = e => {
    e.stopPropagation();

    this.setState({
      openModal: true
    })
  };

  modalClose = () => {
    this.setState({
      openModal: false
    })
  };

  handleRemove = e => {
    e.stopPropagation();
    const { data: { id }, onRemove } = this.props;
    onRemove(id)
  };

  handleCloseProject = e => {
    e.stopPropagation();
    const { data: { id }, onClose } = this.props;
    onClose(id)
  };

  handleOpenProject = e => {
    e.stopPropagation();
    const { data: { id }, onOpen } = this.props;
    onOpen(id)
  };

  handleCreateVacancy = title => {
    const { data: { id }, onAdd } = this.props;
    onAdd(id, title)
  };

  handleStopPropagation = e => e.stopPropagation();

  render() {
    const { data: { title, vacanciesIds, isOpen }, render } = this.props;
    const { open, openModal } = this.state;

    return (
      <Fragment>
        <div
          className={classNames("sj-project", {
            "sj-project_open": open,
            "sj-project_closed": !isOpen
          })}
          onClick={this.handleToggle}
        >
          <Heading className="sj-project__title" variant="2">{ title }</Heading>
          <div className="sj-project-info">
            <span className="sj-project__count">
              {vacanciesIds.length} {numToStr(vacanciesIds.length, ["вакансия", "вакансии", "вакансий"])}
            </span>

            { isOpen && (
              <Fragment>
                <Button variant="primary" onClick={this.modalOpen}>Добавить вакансию</Button>
                <Button
                  className="sj-project__action"
                  onClick={this.handleCloseProject}
                >
                  Закрыть проект
                </Button>
              </Fragment>
            )}
            { !isOpen && (
              <Fragment>
                <span className="sj-project-status">
                  <CheckIcon className="sj-vacancy-status__icon"/>
                  Проект закрыт, сотрудники наняты
                </span>
                <Button
                  className="sj-project__action"
                  variant="primary"
                  onClick={this.handleOpenProject}
                >
                  Открыть проект
                </Button>
              </Fragment>
            )}
            <Button onClick={this.handleRemove}>Удалить</Button>
          </div>
          { vacanciesIds.length >= 1 && open && (
            <div className="sj-project-vacancies" onClick={this.handleStopPropagation}>
              { render(vacanciesIds) }
            </div>
          )}
        </div>
        { openModal && (
          <ModalCreate
            title="Новая вакансия"
            placeholder="Название вакансии"
            onSubmit={this.handleCreateVacancy}
            onClose={this.modalClose}
          />
        )}
      </Fragment>
    );
  }
}
