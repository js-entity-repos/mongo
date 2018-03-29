import { difference, get, has, isArray, isPlainObject, map, mapValues, pick } from 'lodash';

type FilterParser = (filter: object) => object;

const parseFilterKey = (key: string, parser: FilterParser): FilterParser => {
  return (filter: object): object => {
    if (has(filter, key)) {
      const otherKeys = difference(Object.keys(filter), [key]);
      const remainingFilter = pick(filter, otherKeys);
      return { ...remainingFilter, ...parser(get(filter, key)) };
    } else if (isArray(filter)) {
      return map(filter, parseFilterKey(key, parser));
    } else if (isPlainObject(filter)) {
      return mapValues(filter, parseFilterKey(key, parser));
    }

    return filter;
  };
};

export default parseFilterKey;
