import _ from 'underscore';

export const filter = (tasks, id) => _.find(tasks, item => item.id === id);