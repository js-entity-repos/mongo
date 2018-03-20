# mongo
> A concrete implementation of js-entity-repos for mongo.

### Usage
1. Install it with `npm i @js-entity-repos/mongo`.
1. For each entity you will need to do the following.
    1. [Create Entity interfaces](#entity-interface).
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

### Construct the Facade

```ts
import factory from '@js-entity-repos/mongo/dist/factory';
import connectToCollection from '@js-entity-repos/mongo/dist/utils/connectToCollection';
import parseFilterId from '@js-entity-repos/mongo/dist/utils/parseFilterId';
import renameSortId from '@js-entity-repos/mongo/dist/utils/renameSortId';

const todosFacade = factory<TodoEntity>({
  collection: connectToCollection({
    collectionName: 'todos',
    dbName: 'todoapp',
    url: 'mongodb://localhost:27017',
  }),
  // Optional property to convert an entity to a DB document. Defaults to "utils/constructIdDocument".
  constructDocument: ({ id, ...patch}) => {
    return { _id: id, ...patch };
  },
  // Optional property to convert a DB document to an entity. Defaults to "utils/constructIdEntity".
  constructEntity: ({ _id, ...document }) => {
    return { id: _id, ...document };
  },
  // Optional property to convert an entity filter to a DB filter. Defaults to "utils/parseFilterId".
  constructFilter: (filter) => {
    return parseFilterId(filter);
  },
  // Optional property to convert an entity sort to a DB sort. Defaults to "utils/renameSortId".
  constructSort: (sort) => {
    return renameSortId(sort);
  }.
  // Optional property. Defaults to 100.
  defaultPaginationLimit: 100,
  entityName: 'todo',
});
```
