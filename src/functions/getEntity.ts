import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import GetEntity from '@js-entity-repos/core/dist/signatures/GetEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import constructIdFilter from '../utils/constructIdFilter';
import constructMongoFilter from '../utils/constructMongoFilter';

export default <E extends Entity>(config: FacadeConfig<E>): GetEntity<E> => {
  return async ({ id, filter = {} }) => {
    const db = (await config.db());
    const collection = db.collection(config.collectionName);
    const constructedFilter = constructIdFilter({ id, filter, config });
    const mongoFilter = constructMongoFilter(constructedFilter);
    const document = await collection.findOne(mongoFilter);

    if (document === undefined || document === null) {
      throw new MissingEntityError(config.entityName, id);
    }

    const entity = config.constructEntity(document);
    return { entity };
  };
};
