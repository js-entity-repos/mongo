import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import CreateEntity from '@js-entity-repos/core/dist/signatures/CreateEntity';
import Config from '../Config';

export default <Id, Entity>(config: Config<Id, Entity>): CreateEntity<Id, Entity> => {
  return async ({ id, entity }) => {
    const collection = (await config.collection);
    const document = config.constructDocument(id, entity);
    const update = { $setOnInsert: document };
    const opts = { returnOriginal: false, upsert: true };
    const result = await collection.findOneAndUpdate(id, update, opts);
    const notCreated = result.lastErrorObject.upserted === undefined;
    if (notCreated) {
      throw new ConflictingEntityError(config.entityName, id);
    }
    return { entity };
  };
};
