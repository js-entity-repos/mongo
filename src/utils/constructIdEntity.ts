import Entity from '@js-entity-repos/core/dist/types/Entity';

export default <E extends Entity>({ _id, ...document }: any): E => {
  return { ...document, id: _id.toString() };
};
