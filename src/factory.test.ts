import facadeTest from '@js-entity-repos/core/dist/tests';
import { TestEntity } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import factory from './factory';
import connectToCollection from './utils/connectToCollection';

facadeTest(factory<TestEntity>({
  collection: connectToCollection({
    collectionName: 'testentities',
    dbName: 'js-entity-repos-mongo',
    url: 'mongodb://localhost:27017',
  }),
  entityName: 'Test Entity',
}));
