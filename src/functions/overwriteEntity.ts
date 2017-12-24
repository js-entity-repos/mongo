import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import OverwriteEntity from '@js-entity-repos/core/dist/signatures/OverwriteEntity';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): OverwriteEntity<Id, Entity> => {
  return async ({ id, entity }) => {
    const collection = (await config.collection);
    const opts = { returnOriginal: false, upsert: false };
    const { value } = await collection.findOneAndUpdate(id, entity, opts);

    if (value === undefined || value === null) {
      throw new MissingEntityError(config.entityName, id);
    }

    return { entity };
  };
};
