import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';
import countEntities from './functions/countEntities';
import createEntity from './functions/createEntity';
import getEntities from './functions/getEntities';
import getEntity from './functions/getEntity';
import patchEntity from './functions/patchEntity';
import removeEntities from './functions/removeEntities';
import removeEntity from './functions/removeEntity';
import replaceEntity from './functions/replaceEntity';
import constructIdDocument from './utils/constructIdDocument';
import constructIdEntity from './utils/constructIdEntity';
import parseFilterId from './utils/parseFilterId';
import renameSortId from './utils/renameSortId';

export default <E extends Entity>(factoryConfig: FactoryConfig<E>): Facade<E> => {
  const facadeConfig: FacadeConfig<E> = {
    constructDocument: constructIdDocument,
    constructEntity: constructIdEntity,
    constructFilter: parseFilterId,
    constructSort: renameSortId,
    defaultPaginationLimit: 10,
    ...factoryConfig,
  };
  return {
    countEntities: countEntities<E>(facadeConfig),
    createEntity: createEntity<E>(facadeConfig),
    getEntities: getEntities<E>(facadeConfig),
    getEntity: getEntity<E>(facadeConfig),
    patchEntity: patchEntity<E>(facadeConfig),
    removeEntities: removeEntities<E>(facadeConfig),
    removeEntity: removeEntity<E>(facadeConfig),
    replaceEntity: replaceEntity<E>(facadeConfig),
  };
};
