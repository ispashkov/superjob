import * as types from "../../actions/types";

const initialState = {
  projectsEntities: {},
  projectsIds: [],
  vacanciesEntities: {},
  vacanciesIds: [],
  onlyOpened: false,
  searchQuery: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CREATE_PROJECT:
      return {
        ...state,
        projectsEntities: {
          ...state.projectsEntities,
          [payload.id]: {
            ...payload
          }
        },
        projectsIds: [...state.projectsIds, payload.id]
      };
    case types.REMOVE_PROJECT:
      const newProjectEntities = {...state.projectsEntities};
      let updatedVacanciesIds = [ ...state.vacanciesIds ];
      const updatedVacanciesEntities = {...state.vacanciesEntities };
      const removedProject = newProjectEntities[payload.id];
      
      for (const vacancyId of removedProject.vacanciesIds) {
        updatedVacanciesIds = updatedVacanciesIds.filter(id => id !== vacancyId);
        delete updatedVacanciesEntities[vacancyId];
      }

      delete newProjectEntities[payload.id];

      const newProjectIds = state.projectsIds.filter(id => id !== payload.id);

      return {
        ...state,
        projectsEntities: {
          ...newProjectEntities,
        },
        projectsIds: [...newProjectIds],
        vacanciesEntities: { ...updatedVacanciesEntities },
        vacanciesIds: [ ...updatedVacanciesIds ]
      };
    case types.CLOSE_PROJECT:
      const vacancyOfProject = [...state.projectsEntities[payload.id].vacanciesIds];
      const newVacanciesEntities = {...state.vacanciesEntities};

      for(const id of vacancyOfProject) {
        newVacanciesEntities[id] = {
          ...newVacanciesEntities[id],
          isOpen: false
        }
      }

      return {
        ...state,
        projectsEntities: {
          ...state.projectsEntities,
          [payload.id]: {
            ...state.projectsEntities[payload.id],
            isOpen: false
          }
        },
        vacanciesEntities: {
          ...newVacanciesEntities,

        }
      };
    case types.OPEN_PROJECT:
      return {
        ...state,
        projectsEntities: {
          ...state.projectsEntities,
          [payload.id]: {
            ...state.projectsEntities[payload.id],
            isOpen: true
          }
        }
      };
    case types.CREATE_VACANCY:
      const editableProject = state.projectsEntities[payload.projectId];

      return {
        ...state,
        projectsEntities: {
          ...state.projectsEntities,
          [payload.projectId]: {
            ...editableProject,
            vacanciesIds: [...editableProject.vacanciesIds, payload.vacancy.id]
          }
        },
        vacanciesEntities: {
          ...state.vacanciesEntities,
          [payload.vacancy.id]: {
            ...payload.vacancy
          }
        },
        vacanciesIds: [...state.vacanciesIds, payload.vacancy.id]
      };
    case types.REMOVE_VACANCY:
      const updatedProject = state.projectsEntities[payload.projectId];

      const updatedVacancy = updatedProject.vacanciesIds.filter(id => id !== payload.vacancyId);

      const updateVacancyEntities = {...state.vacanciesEntities};
      delete updateVacancyEntities[payload.vacancyId];

      const updateVacancyIds = state.vacanciesIds.filter(id => id !== payload.vacancyId)

      return {
        ...state,
        projectsEntities: {
          ...state.projectsEntities,
          [payload.projectId]: {
            ...updatedProject,
            vacanciesIds: [...updatedVacancy]
          }
        },
        vacanciesEntities: { ...updateVacancyEntities },
        vacanciesIds: [...updateVacancyIds]
      };
    case types.CLOSE_VACANCY:
      return {
        ...state,
        vacanciesEntities: {
          ...state.vacanciesEntities,
          [payload.id]: {
            ...state.vacanciesEntities[payload.id],
            isOpen: false
          }
        }
      };

    case types.OPEN_VACANCY:
      return {
        ...state,
        vacanciesEntities: {
          ...state.vacanciesEntities,
          [payload.id]: {
            ...state.vacanciesEntities[payload.id],
            isOpen: true
          }
        }
      };
    case types.ONLY_OPENED_TOGGLE:
      return {
        ...state,
        onlyOpened: payload.onlyOpened
      };
    case types.UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload.query
      };
    default:
      return state
  }
};
