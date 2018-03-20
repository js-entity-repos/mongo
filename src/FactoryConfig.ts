import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import { Db } from 'mongodb';

export type Document = any;

export default interface FactoryConfig<E extends Entity> {
  readonly collectionName?: string;
  readonly constructDocument?: (patch: Partial<E>) => Document;
  readonly constructEntity?: (document: Document) => E;
  readonly constructFilter?: (filter: Filter<E>) => any;
  readonly constructSort?: (sort: Sort<E>) => any;
  readonly db: () => Promise<Db>;
  readonly defaultPaginationLimit?: number;
  readonly entityName: string;
}
