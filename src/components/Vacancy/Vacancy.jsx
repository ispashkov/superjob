import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Heading from "../Heading"
import Button from "../Button";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import "./Vacancy.scss";

export default class Vacancy extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isOpen: PropTypes.bool.isRequired
    }).isRequired,
    projectId: PropTypes.string.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  };

  handleRemove = e => {
    e.stopPropagation();
    const { data: { id }, projectId, onRemove } = this.props;
    onRemove(projectId, id)
  };

  handleOpen = e => {
    e.stopPropagation();
    const { data: { id }, onOpen } = this.props;
    onOpen(id)
  };

  handleClose = e => {
    e.stopPropagation();
    const { data: { id }, onClose } = this.props;
    onClose(id)
  };

  render() {
    const { data: { title, isOpen } } = this.props;

    return (
      <div className={classNames("sj-vacancy", {
        "sj-vacancy_closed": !isOpen
      })}>
        <Heading className="sj-vacancy__title" variant="4">{title}</Heading>
        <div className="sj-vacancy-info">

          {isOpen && (
            <Fragment>
              <span className="sj-vacancy-status">
                <SearchIcon className="sj-vacancy-status__icon"/>
                Вакансия открыта, идет подбор кандидатов
              </span>
              <Button className="sj-vacancy__action" onClick={this.handleClose}>Закрыть вакансию</Button>
            </Fragment>
          )}
          {!isOpen && (
            <Fragment>
              <span className="sj-vacancy-status">
                <CheckIcon className="sj-vacancy-status__icon"/>
                Вакансия закрыта, сотрудник нанят
              </span>
              <Button
                className="sj-vacancy__action"
                onClick={this.handleOpen}
                variant="primary"
              >
                Открыть вакансию
              </Button>
            </Fragment>
          )}
          <Button onClick={this.handleRemove}>Удалить</Button>
        </div>
      </div>
    );
  }
}
