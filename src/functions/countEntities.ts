import CountEntities from '@js-entity-repos/core/dist/signatures/CountEntities';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): CountEntities<Entity> => {
  return async ({ filter }) => {
    const collection = (await config.collection);
    const count = await collection.find(filter).count();
    return { count };
  };
};
