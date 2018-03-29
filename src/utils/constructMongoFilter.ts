import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Filter } from '@js-entity-repos/core/dist/types/Filter';
import parseFilterKey from './parseFilterKey';

export default <E extends Entity>(filter: Filter<E>) => {
  return parseFilterKey('$search', (value: any) => {
    return { $regex: new RegExp(value, 'i') };
  })(filter);
};
