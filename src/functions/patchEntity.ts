import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import PatchEntity from '@js-entity-repos/core/dist/signatures/PatchEntity';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): PatchEntity<Id, Entity> => {
  return async ({ id, patch }) => {
    const collection = (await config.collection);
    const document = config.constructDocument(id, patch);
    const update = { $set: document };
    const opts = { returnOriginal: false, upsert: false };
    const { value } = await collection.findOneAndUpdate(id, update, opts);

    if (value === undefined || value === null) {
      throw new MissingEntityError(config.entityName, id);
    }

    const entity = config.constructEntity(value);
    return { entity };
  };
};
