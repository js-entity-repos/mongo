import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import RemoveEntity from '@js-entity-repos/core/dist/signatures/RemoveEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import constructIdFilter from '../utils/constructIdFilter';

export default <E extends Entity>(config: FacadeConfig<E>): RemoveEntity<E> => {
  return async ({ id, filter = {} }) => {
    const db = (await config.db());
    const collection = db.collection(config.collectionName);
    const constructedFilter = constructIdFilter({ id, filter, config });
    const { value } = await collection.findOneAndDelete(constructedFilter);

    if (value === undefined || value === null) {
      throw new MissingEntityError(config.entityName, id);
    }
  };
};
