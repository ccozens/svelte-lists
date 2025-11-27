import { Database } from '@sqlitecloud/drivers';

const database = new Database(process.env.SQLITECLOUD_CONNECTION_STRING);

export default async function handler(req, res) {
  try {
    // Set database
    await database.sql`USE DATABASE svelte_lists.sqlite`;
    
    // Keep alive query
    await database.sql`SELECT 1`;
    
    res.status(200).json({ 
      success: true, 
      message: 'Database keep-alive successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Keep-alive failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
