import React, { Component } from "react";
import PropTypes from "prop-types";
import Project from "../Project";
import Vacancy from "../Vacancy";
import "./ProjectList.scss";

export default class ProjectList extends Component {
  static propTypes = {
    projectsIds: PropTypes.any.isRequired,
    projectsEntities: PropTypes.object.isRequired,
    vacanciesEntities: PropTypes.object.isRequired,
    removeProject: PropTypes.func.isRequired,
    closeProject: PropTypes.func.isRequired,
    openProject: PropTypes.func.isRequired,
    createVacancy: PropTypes.func.isRequired,
    removeVacancy: PropTypes.func.isRequired,
    closeVacancy: PropTypes.func.isRequired,
    openVacancy: PropTypes.func.isRequired
  };

  render() {
    const {
      projectsIds,
      projectsEntities,
      vacanciesEntities,
      removeProject,
      closeProject,
      openProject,
      createVacancy,
      openVacancy,
      closeVacancy,
      removeVacancy
    } = this.props;

    return (
      <div className="sj-project-list">
        { projectsIds.map(projectId => projectsEntities[projectId] && (
          <div key={projectId} className="sj-project-list__item">
            <Project
              data={projectsEntities[projectId]}
              onAdd={createVacancy}
              onOpen={openProject}
              onClose={closeProject}
              onRemove={removeProject}
              render={(vacanciesIds) => vacanciesIds.map(vacancyId => (
                vacanciesEntities[vacancyId] && (
                  <Vacancy
                    projectId={projectId}
                    key={vacancyId}
                    data={vacanciesEntities[vacancyId]}
                    onOpen={openVacancy}
                    onClose={closeVacancy}
                    onRemove={removeVacancy}
                  />
                )
              ))}
            />
          </div>
        ))}
      </div>
    );
  }
}
