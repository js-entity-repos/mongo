import { Collection } from 'mongodb';
import connectToDb, { Opts as DbConnectionOpts } from './connectToDb';

export interface Opts extends DbConnectionOpts {
  readonly collectionName: string;
}

export default async ({ collectionName, ...dbConnectionOpts }: Opts): Promise<Collection> => {
  const db = await connectToDb(dbConnectionOpts);
  return db.collection(collectionName);
};
