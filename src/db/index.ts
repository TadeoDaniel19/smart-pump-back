import { join } from 'path';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { Data } from '../models/users';

const file = join(__dirname, '../../data/users.json');
const adapter = new JSONFileSync<Data>(file);
const defaultData: Data = { users: [] };
const db = new LowSync<Data>(adapter, defaultData);

db.read();
db.data ||= { users: [] };

export default db;
