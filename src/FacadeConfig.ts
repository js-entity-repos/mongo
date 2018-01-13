import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import { Collection } from 'mongodb';

export type Document = any;

export default interface FacadeConfig<E extends Entity> {
  readonly collection: Promise<Collection>;
  readonly defaultPaginationLimit: number;
  readonly entityName: string;
  readonly constructDocument: (patch: Partial<E>) => Document;
  readonly constructEntity: (document: Document) => E;
  readonly constructFilter: (filter: Filter<E>) => any;
  readonly constructSort: (sort: Sort<E>) => any;
}
