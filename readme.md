# mongo
> A concrete implementation of js-entity-repos for mongo.

### Usage
1. Install it with `npm i @js-entity-repos/mongo`.
1. For each entity you will need to do the following.
    1. [Create Entity interfaces](#entity-interface).
    1. [Create a factory config](#factory-config).
    1. [Construct the facade](#construct-the-facade).
    1. [Use the facade](https://github.com/js-entity-repos/core/blob/master/docs/facade.md).

### Entity Interface

```ts
import Entity from '@js-entity-repos/core/dist/types/Entity';

export interface TodoEntity extends Entity {
  readonly description: string;
  readonly completed: boolean;
}
```

### Factory Config

```ts
import FactoryConfig from '@js-entity-repos/mongo/dist/FactoryConfig';
import connectToCollection from '@js-entity-repos/mongo/dist/utils/connectToCollection';
import parseFilterId from '@js-entity-repos/mongo/dist/utils/parseFilterId';
import renameSortId from '@js-entity-repos/mongo/dist/utils/renameSortId';

const todoFacadeConfig: FacadeConfig<TodoEntity> = {
  collection: connectToCollection({
    dbName: 'todoapp',
    url: 'mongodb://localhost:27017',
  }),
  collectionName: 'todos',
  constructDocument: ({ id, ...patch}) => {
    // Optional property that converts an entity to a document for the database.
    return { _id: id, ...patch };
  },
  constructEntity: ({ _id, ...document }) => {
    // Optional property that converts a document from the database to an entity.
    return { id: _id, ...document };
  },
  constructFilter: (filter) => {
    // Optional property that converts an entity filter to a filter for the DB.
    return parseFilterId(filter);
  },
  constructSort: (sort) => {
    // Optional property that converts an entity sort to a sort for the DB.
    return renameSortId(sort);
  }.
  defaultPaginationLimit: 100, // Optional property.
  entityName: 'todo',
};
```

### Construct the Facade

```ts
import factory from '@js-entity-repos/mongo/dist/factory';

const todosFacade = factory(todoFacadeConfig);
```
