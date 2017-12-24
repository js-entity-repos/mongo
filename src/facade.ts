import Facade from '@js-entity-repos/core/dist/Facade';
import Config from './Config';
import countEntities from './functions/countEntities';
import createEntity from './functions/createEntity';
import getEntities from './functions/getEntities';
import getEntity from './functions/getEntity';
import overwriteEntity from './functions/overwriteEntity';
import patchEntity from './functions/patchEntity';
import removeEntities from './functions/removeEntities';
import removeEntity from './functions/removeEntity';
import upsertEntity from './functions/upsertEntity';

export default <Id, Entity>(config: Config<Id, Entity>): Facade<Id, Entity> => {
  return {
    countEntities: countEntities(config),
    createEntity: createEntity(config),
    getEntities: getEntities(config),
    getEntity: getEntity(config),
    overwriteEntity: overwriteEntity(config),
    patchEntity: patchEntity(config),
    removeEntities: removeEntities(config),
    removeEntity: removeEntity(config),
    upsertEntity: upsertEntity(config),
  };
};
