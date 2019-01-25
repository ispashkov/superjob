import { connect } from "react-redux";
import ProjectList from "../components/ProjectList";
import { getProjectsIds, getProjectEntities, getVacanciesEntities } from "../selectors";
import {
  removeProject,
  closeProject,
  openProject,
  createVacancy,
  removeVacancy,
  closeVacancy,
  openVacancy
} from "../actions";

const mapStateToProps = state => {
  const { searchQuery } = state.projects;

  return {
    projectsIds: getProjectsIds(state),
    projectsEntities: getProjectEntities(getProjectsIds(state))(state),
    vacanciesEntities: getVacanciesEntities(state),
    searchQuery
  }
};

const mapDispatchToProps = dispatch => ({
  removeProject: id => dispatch(removeProject(id)),
  closeProject: id => dispatch(closeProject(id)),
  openProject: id => dispatch(openProject(id)),
  createVacancy: (projectId, title) => dispatch(createVacancy(projectId, title)),
  removeVacancy: (projectId, vacancyId) => dispatch(removeVacancy(projectId, vacancyId)),
  closeVacancy: id => dispatch(closeVacancy(id)),
  openVacancy: id => dispatch(openVacancy(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
