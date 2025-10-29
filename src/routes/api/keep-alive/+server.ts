
import { json } from '@sveltejs/kit';
import { database } from '../../../hooks.server';

export async function GET() {
  try {
    // Run a simple query to keep the database awake
    await database.sql`SELECT 1`;
    
    return json({ 
      success: true, 
      message: 'Database keep-alive successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Keep-alive failed:', error);
    return json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
