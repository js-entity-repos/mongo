import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import GetEntity from '@js-entity-repos/core/dist/signatures/GetEntity';
import Config from '../Config';

export default <Id, Entity>(config: Config<Id, Entity>): GetEntity<Id, Entity> => {
  return async ({ id }) => {
    const collection = (await config.collection);
    const document = await collection.findOne(id);

    if (document === undefined || document === null) {
      throw new MissingEntityError(config.entityName, id);
    }

    const entity = config.constructEntity(document);
    return { entity };
  };
};
