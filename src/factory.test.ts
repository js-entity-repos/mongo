import facadeTest from '@js-entity-repos/core/dist/tests';
import { TestEntity } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import factory from './factory';
import connectToDb from './utils/connectToDb';

facadeTest(factory<TestEntity>({
  db: connectToDb({
    dbName: 'js-entity-repos-mongo',
    url: 'mongodb://localhost:27017',
  }),
  entityName: 'TestEntity',
}));
