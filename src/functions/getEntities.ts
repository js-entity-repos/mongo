import GetEntities from '@js-entity-repos/core/dist/signatures/GetEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import createCursorFromEntity from '@js-entity-repos/core/dist/utils/createCursorFromEntity';
import createPaginationFilter from '@js-entity-repos/core/dist/utils/createPaginationFilter';
import { first, last, mapValues } from 'lodash';
import FacadeConfig from '../FacadeConfig';

const xor = (conditionA: boolean, conditionB: boolean) => {
  return (conditionA && !conditionB) || (!conditionA && conditionB);
};

export default <E extends Entity>(config: FacadeConfig<E>): GetEntities<E> => {
  const defaultPagination = {
    cursor: undefined,
    forward: true,
    limit: config.defaultPaginationLimit,
  };
  const defaultSort = { id: true } as Sort<E>;
  return async ({ filter = {}, sort = defaultSort, pagination = defaultPagination }) => {
    const collection = (await config.collection());

    const paginationFilter = createPaginationFilter(pagination, sort);
    const fullFilter = { $and: [filter, paginationFilter] };
    const constructedFilter = config.constructFilter(fullFilter);
    const constructedSort = config.constructSort(sort);
    const mongoSort = mapValues(constructedSort, (sortValue: boolean) => {
      return !xor(pagination.forward, sortValue) ? 1 : -1;
    });

    const documents = await collection
      .find(constructedFilter)
      .sort(mongoSort)
      .limit(pagination.limit)
      .toArray();

    const entities = documents.map(config.constructEntity);
    const nextCursor = createCursorFromEntity(last(entities), sort);
    const previousCursor = createCursorFromEntity(first(entities), sort);

    return { entities, nextCursor, previousCursor };
  };
};
