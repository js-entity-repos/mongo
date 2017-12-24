import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import RemoveEntity from '@js-entity-repos/core/dist/signatures/RemoveEntity';
import Config from '../Config';

export default <Id, Entity>(config: Config<Id, Entity>): RemoveEntity<Id> => {
  return async ({ id }) => {
    const collection = (await config.collection);
    const { value } = await collection.findOneAndDelete(id);

    if (value === undefined || value === null) {
      throw new MissingEntityError(config.entityName, id);
    }
  };
};
