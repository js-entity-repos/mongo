import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import PatchEntity from '@js-entity-repos/core/dist/signatures/PatchEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import constructIdFilter from '../utils/constructIdFilter';

export default <E extends Entity>(config: FacadeConfig<E>): PatchEntity<E> => {
  return async ({ id, patch, filter = {} }) => {
    const db = (await config.db());
    const collection = db.collection(config.collectionName);
    const document = config.constructDocument({ ...patch as any, id });
    const update = { $set: document };
    const opts = { returnOriginal: false, upsert: false };
    const constructedFilter = constructIdFilter({ id, filter, config });
    const { value } = await collection.findOneAndUpdate(constructedFilter, update, opts);

    if (value === undefined || value === null) {
      throw new MissingEntityError(config.entityName, id);
    }

    const entity = config.constructEntity(value);
    return { entity };
  };
};
