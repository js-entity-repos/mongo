import { Db, MongoClient } from 'mongodb';

export interface Opts {
  readonly dbName: string;
  readonly url: string;
}

export default async ({ dbName, url }: Opts): Promise<Db> => {
  const client = await (new MongoClient(url)).connect();
  return client.db(dbName);
};
