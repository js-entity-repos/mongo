import { once } from 'lodash';
import { Db, MongoClient } from 'mongodb';

export interface Opts {
  readonly dbName: string;
  readonly url: string;
}

export default ({ dbName, url }: Opts) => {
  return once(async (): Promise<Db> => {
    const client = await MongoClient.connect(url);
    return client.db(dbName);
  });
};
