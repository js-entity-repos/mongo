import { Collection } from 'mongodb';

export type Document = any;

export default interface Config<Id, Entity> {
  readonly collection: Promise<Collection>;
  readonly entityName: string;
  readonly constructDocument: (id: Id, patch: Partial<Entity>) => Document;
  readonly constructEntity: (document: Document) => Entity;
}
