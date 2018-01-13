import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import CreateEntity from '@js-entity-repos/core/dist/signatures/CreateEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Filter } from '@js-entity-repos/core/dist/types/Filter';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): CreateEntity<E> => {
  return async ({ id, entity }) => {
    const collection = (await config.collection);
    const document = config.constructDocument({ ...entity as any, id });
    const update = { $setOnInsert: document };
    const opts = { returnOriginal: false, upsert: true };
    const constructedFilter = config.constructFilter({ id } as Filter<E>);
    const result = await collection.findOneAndUpdate(constructedFilter, update, opts);
    const notCreated = result.lastErrorObject.upserted === undefined;
    if (notCreated) {
      throw new ConflictingEntityError(config.entityName, id);
    }
    return { entity };
  };
};
