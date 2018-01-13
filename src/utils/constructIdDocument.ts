import Entity from '@js-entity-repos/core/dist/types/Entity';

export default <E extends Entity>(entityPatch: Partial<E>) => {
  const { id, ...patch } = entityPatch as any;
  return { _id: id, ...patch };
};
