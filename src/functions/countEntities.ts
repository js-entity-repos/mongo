import CountEntities from '@js-entity-repos/core/dist/signatures/CountEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import constructMongoFilter from '../utils/constructMongoFilter';

export default <E extends Entity>(config: FacadeConfig<E>): CountEntities<E> => {
  return async ({ filter = {} }) => {
    const db = (await config.db());
    const collection = db.collection(config.collectionName);
    const constructedFilter = config.constructFilter(filter);
    const mongoFilter = constructMongoFilter(constructedFilter);
    const count = await collection.find(mongoFilter).count();
    return { count };
  };
};
