import { connect } from "react-redux";
import AppBar from "../components/AppBar";
import {createProject, toggleOnlyOpened, updateSearchQuery } from "../actions";

const mapStateToProps = state => {
  const { onlyOpened, searchQuery } = state.projects;
  return {
    onlyOpened,
    searchQuery
  }
};

const mapDispatchToProps = dispatch => ({
  createProject: title => dispatch(createProject(title)),
  toggleOnlyOpened: value => dispatch(toggleOnlyOpened(value)),
  updateSearchQuery: value => dispatch(updateSearchQuery(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
