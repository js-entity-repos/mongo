import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import ReplaceEntity from '@js-entity-repos/core/dist/signatures/ReplaceEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import constructIdFilter from '../utils/constructIdFilter';
import constructMongoFilter from '../utils/constructMongoFilter';

export default <E extends Entity>(config: FacadeConfig<E>): ReplaceEntity<E> => {
  return async ({ id, entity, filter = {} }) => {
    const db = (await config.db());
    const collection = db.collection(config.collectionName);
    const opts = { returnOriginal: false, upsert: false };
    const constructedFilter = constructIdFilter({ id, filter, config });
    const mongoFilter = constructMongoFilter(constructedFilter);
    const { value } = await collection.findOneAndUpdate(mongoFilter, entity, opts);

    if (value === undefined || value === null) {
      throw new MissingEntityError(config.entityName, id);
    }

    return { entity };
  };
};
