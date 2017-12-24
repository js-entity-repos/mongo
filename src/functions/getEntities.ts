import GetEntities from '@js-entity-repos/core/dist/signatures/GetEntities';
import createCursorFromEntity from '@js-entity-repos/core/dist/utils/createCursorFromEntity';
import createPaginationFilter from '@js-entity-repos/core/dist/utils/createPaginationFilter';
import { first, last, mapValues } from 'lodash';
import Config from '../Config';

const xor = (conditionA: boolean, conditionB: boolean) => {
  return (conditionA && !conditionB) || (!conditionA && conditionB);
};

export default <Id, Entity extends Id>(config: Config<Id, Entity>): GetEntities<Entity> => {
  return async ({ filter, sort, pagination }) => {
    const collection = (await config.collection);

    const paginationFilter = createPaginationFilter(pagination, sort);
    const fullFilter = { $and: [filter, paginationFilter] };
    const mongoSort = mapValues(sort, (sortValue: boolean) => {
      return !xor(pagination.forward, sortValue) ? 1 : -1;
    });

    const documents = await collection
      .find(fullFilter)
      .sort(mongoSort)
      .limit(pagination.limit)
      .toArray();

    const entities = documents.map(config.constructEntity);
    const nextCursor = createCursorFromEntity(last(entities), sort);
    const previousCursor = createCursorFromEntity(first(entities), sort);

    return { entities, nextCursor, previousCursor };
  };
};
