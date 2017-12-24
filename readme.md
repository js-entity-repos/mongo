# mongo
> A concrete implementation of js-entity-repos for mongo.

### Usage
1. Install it with `npm i @js-entity-repos/mongo`.
1. For each entity you will need to do the following.
    1. [Create Id and Entity interfaces](#id-and-entity-interface).
    1. [Create a facade config](#facade-config).
    1. [Construct the facade with the config and interfaces](#calling-the-facade).
    1. [Use the facade](https://github.com/js-entity-repos/core/blob/master/docs/facade.md).

### Id and Entity Interface

```ts
export interface TodoId {
  readonly id: string;
}

export interface TodoEntity extends TodoId {
  readonly description: string;
  readonly completed: boolean;
}
```

### Facade Config

```ts
import facade from '@js-entity-repos/mongo/dist/utils/connectToCollection';

const todoFacadeConfig = {
  collection: connectToCollection({
    collectionName: 'todos',
    dbName: 'todoapp',
    url: 'mongodb://localhost:27017',
  }),
  entityName: 'todo',
};
```

### Construct the Facade

```ts
import facade from '@js-entity-repos/mongo/dist/facade';

const todosFacade = facade<TodoId, TodoEntity>(todoFacadeConfig);
```
