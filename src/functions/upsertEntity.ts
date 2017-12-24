import UpsertEntity from '@js-entity-repos/core/dist/signatures/UpsertEntity';
import Config from '../Config';

export default <Id, Entity>(config: Config<Id, Entity>): UpsertEntity<Id, Entity> => {
  return async ({ id, entity }) => {
    const collection = (await config.collection);
    const document = config.constructDocument(id, entity);
    const opts = { returnOriginal: false, upsert: true };
    await collection.findOneAndUpdate(id, document, opts);
    return { entity };
  };
};
