import GetEntities from '@js-entity-repos/core/dist/signatures/GetEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Pagination from '@js-entity-repos/core/dist/types/Pagination';
import { forward } from '@js-entity-repos/core/dist/types/PaginationDirection';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import SortOrder, { asc } from '@js-entity-repos/core/dist/types/SortOrder';
import createGetEntitiesResult from '@js-entity-repos/core/dist/utils/createGetEntitiesResult';
import createPaginationFilter from '@js-entity-repos/core/dist/utils/createPaginationFilter';
import { mapValues } from 'lodash';
import FacadeConfig from '../FacadeConfig';
import constructMongoFilter from '../utils/constructMongoFilter';

const xor = (conditionA: boolean, conditionB: boolean) => {
  return (conditionA && !conditionB) || (!conditionA && conditionB);
};

export default <E extends Entity>(config: FacadeConfig<E>): GetEntities<E> => {
  const defaultPagination: Pagination = {
    cursor: undefined,
    direction: forward,
    limit: config.defaultPaginationLimit,
  };
  const defaultSort = { id: asc } as Sort<E>;
  return async ({ filter = {}, sort = defaultSort, pagination = defaultPagination }) => {
    const db = (await config.db());
    const collection = db.collection(config.collectionName);

    const paginationFilter = createPaginationFilter(pagination, sort);
    const fullFilter = { $and: [filter, paginationFilter] };
    const constructedFilter = config.constructFilter(fullFilter);
    const constructedSort = config.constructSort(sort);
    const mongoFilter = constructMongoFilter(constructedFilter);
    const mongoSort = mapValues(constructedSort, (sortOrder: SortOrder) => {
      return !xor(pagination.direction === forward, sortOrder === asc) ? 1 : -1;
    });

    const results = await collection
      .find(mongoFilter)
      .sort(mongoSort)
      .limit(pagination.limit + 1)
      .toArray();
    const documents = results.slice(0, pagination.limit);

    const entities: E[] = documents.map(config.constructEntity);
    const isEnd = results.length <= pagination.limit;

    return createGetEntitiesResult({ entities, isEnd, pagination, sort });
  };
};
