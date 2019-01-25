import nanoId from "nanoid";
import * as types from "./types";

export const createProject = title => ({
  type: types.CREATE_PROJECT,
  payload: {
    id: nanoId(),
    title,
    vacanciesIds: [],
    isOpen: true
  }
});

export const removeProject = id => ({
  type: types.REMOVE_PROJECT,
  payload: {
    id
  }
});

export const closeProject = id => ({
  type: types.CLOSE_PROJECT,
  payload: {
    id
  }
});

export const openProject = id => ({
  type: types.OPEN_PROJECT,
  payload: {
    id
  }
});

export const createVacancy = (projectId, title ) => ({
  type: types.CREATE_VACANCY,
  payload: {
    projectId,
    vacancy: {
      id: nanoId(),
      title,
      isOpen: true
    }
  }
});

export const removeVacancy = (projectId, vacancyId) => ({
  type: types.REMOVE_VACANCY,
  payload: {
    projectId,
    vacancyId
  }
});

export const closeVacancy = id => ({
  type: types.CLOSE_VACANCY,
  payload: {
    id
  }
});

export const openVacancy = id => ({
  type: types.OPEN_VACANCY,
  payload: {
    id
  }
});

export const toggleOnlyOpened = onlyOpened => ({
  type: types.ONLY_OPENED_TOGGLE,
  payload: {
    onlyOpened
  }
});

export const updateSearchQuery = query => ({
  type: types.UPDATE_SEARCH_QUERY,
  payload: {
    query
  }
})


