export const getProjectsIds = state => {
  const {
    projectsIds,
    projectsEntities,
    vacanciesEntities,
    onlyOpened
  } = state.projects;

  switch (onlyOpened) {
    case true:
      return projectsIds.filter(projectId => {
        const project = {...projectsEntities[projectId]};

        const projectVacancies = project.vacanciesIds.filter(
          vacancyId => vacanciesEntities[vacancyId].isOpen === true
        );

        return projectVacancies.length ? projectId : false
      });
    case false:
    default:
      return projectsIds
  }
};

export const getVacanciesEntities = state => {
  const { vacanciesEntities, onlyOpened } = state.projects;

  switch (onlyOpened) {
    case true:
      let newVacanciesEntities = {};

      for (const key of Object.keys(vacanciesEntities)) {
        if (vacanciesEntities[key].isOpen === true) {
          newVacanciesEntities = {...newVacanciesEntities, [key]: {
              ...vacanciesEntities[key]
            } }
        }
      }

      return newVacanciesEntities;
    case false:
    default:
      return vacanciesEntities
  }
};

export const getProjectEntities = projectsIds => state => {
  const { projectsEntities, vacanciesEntities, searchQuery, onlyOpened } = state.projects;

  if (!(searchQuery.length && projectsIds.length)) return projectsEntities;

  let newProjectEntities = {};

  for (const projectId of projectsIds) {
    let project = { ...projectsEntities[projectId] };

    const projectVacancies = project.vacanciesIds.filter(vacancyId => {
      const searchValue = vacanciesEntities[vacancyId].title.toLowerCase();
      return searchValue.indexOf(searchQuery.toLowerCase()) !== -1 ? vacancyId : false
    });

    if (!projectVacancies.length) continue;

    newProjectEntities = {
      ...newProjectEntities,
      [projectId]: {
        ...project,
        vacanciesIds: projectVacancies
      }
    }
  }

  let resultEntities = {};

  if (onlyOpened) {

    for (const projectId of Object.keys(newProjectEntities)) {
      const filteredVacancies = newProjectEntities[projectId].vacanciesIds.filter(id => {
        return vacanciesEntities[id].isOpen === true
      });

      if (!filteredVacancies.length) continue

      resultEntities = {
        ...resultEntities,
        [projectId]: {
          ...newProjectEntities[projectId],
          vacanciesIds: filteredVacancies
        }
      }
    }
  }

  return onlyOpened ? resultEntities : newProjectEntities;
};
