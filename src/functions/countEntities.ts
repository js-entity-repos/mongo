import CountEntities from '@js-entity-repos/core/dist/signatures/CountEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): CountEntities<E> => {
  return async ({ filter = {} }) => {
    const collection = (await config.collection);
    const constructedFilter = config.constructFilter(filter);
    const count = await collection.find(constructedFilter).count();
    return { count };
  };
};
