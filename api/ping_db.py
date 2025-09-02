import sqlitecloud as sc
import os
import time

def handler(request):
    """
    Vercel serverless function to connect and ping the SQLite Cloud database.
    This function is triggered by a scheduled cron job.
    """
    connection_string = os.environ.get("SQLITECLOUD_CONNECTION_STRING")

    if not connection_string:
        print("Error: SQLITECLOUD_CONNECTION_STRING environment variable is not set.")
        # Vercel functions should return a response
        return "Error: SQLITECLOUD_CONNECTION_STRING not set.", 500

    try:
        print(f"[{time.ctime()}] Attempting to connect to SQLite Cloud...")
        # Use a timeout to prevent the script from hanging indefinitely
        conn = sc.connect(connection_string, timeout_sec=10)

        # Execute a lightweight, non-destructive query
        cursor = conn.cursor()
        cursor.execute("SELECT 1;")
        result = cursor.fetchone()

        print(f"[{time.ctime()}] Ping successful. Result: {result}")

        # Return a success message
        return "Ping successful.", 200

    except Exception as e:
        print(f"[{time.ctime()}] An error occurred: {e}")
        return f"An error occurred: {e}", 500

    finally:
        if 'conn' in locals() and conn:
            conn.close()
            print(f"[{time.ctime()}] Connection closed.")
