import facadeTest from '@js-entity-repos/core/dist/tests';
import { TestEntity, TestId } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import facade from './facade';
import connectToCollection from './utils/connectToCollection';

facadeTest(facade<TestId, TestEntity>({
  collection: connectToCollection({
    collectionName: 'testentities',
    dbName: 'js-entity-repos-mongo',
    url: 'mongodb://localhost:27017',
  }),
  constructDocument: (id, patch) => {
    return { ...patch, ...id };
  },
  constructEntity: ({ _id, ...document }) => {
    return document;
  },
  entityName: 'Test Entity',
}));
