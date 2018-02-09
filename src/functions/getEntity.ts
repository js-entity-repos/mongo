import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import GetEntity from '@js-entity-repos/core/dist/signatures/GetEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import constructIdFilter from '../utils/constructIdFilter';

export default <E extends Entity>(config: FacadeConfig<E>): GetEntity<E> => {
  return async ({ id, filter = {} }) => {
    const collection = (await config.collection());
    const constructedFilter = constructIdFilter({ id, filter, config });
    const document = await collection.findOne(constructedFilter);

    if (document === undefined || document === null) {
      throw new MissingEntityError(config.entityName, id);
    }

    const entity = config.constructEntity(document);
    return { entity };
  };
};
