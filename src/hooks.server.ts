import { Database } from '@sqlitecloud/drivers';
import { SQLITECLOUD_CONNECTION_STRING } from '$env/static/private';

const database = new Database(SQLITECLOUD_CONNECTION_STRING);

// set database to use
const setDatabase = async () => {
	await database.sql`USE DATABASE svelte_lists.sqlite`;
};

await setDatabase();

export { database };
