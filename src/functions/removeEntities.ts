import RemoveEntities from '@js-entity-repos/core/dist/signatures/RemoveEntities';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): RemoveEntities<Entity> => {
  return async ({ filter }) => {
    const collection = (await config.collection);
    await collection.remove(filter);
  };
};
