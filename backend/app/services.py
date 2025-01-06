import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv

load_dotenv()
userId = os.getenv('dbuser')
userPw = os.getenv('dbpw')
# Database connection setup
def get_db_connection():
    conn = psycopg2.connect(
        dbname="chatbot", user=userId, password=userPw, host="localhost"
    )
    return conn

# Function to save message and sentiment data
def save_to_db(message, sentiment):
    conn = get_db_connection()
    try:
        cur = conn.cursor()

        # Prepare the SQL query to insert data into the table
        query = sql.SQL("INSERT INTO messages (text, sentiment, score) VALUES (%s, %s, %s)")

        # Execute the query with the provided data
        cur.execute(query, (message, sentiment['label'], sentiment['score']))

        # Commit the transaction
        conn.commit()

        # Optionally, you can fetch the last inserted row if needed
        # last_row_id = cur.fetchone()

        cur.close()
    except Exception as e:
        print(f"Error saving to database: {e}")
    finally:
        # Ensure the connection is always closed after the operation
        conn.close()
