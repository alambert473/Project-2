const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'drivewaysealing',
  port: process.env.DB_PORT || 3306,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log('DB connection: ' + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  // Insert a new client
  async insertClient(first_name, last_name, address, email, phone_number, credit_card_info, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `
          INSERT INTO clients (first_name, last_name, address, email, phone_number, credit_card_info, password, registration_date)
          VALUES (?, ?, ?, ?, ?, ?, ?, NOW());
        `;
        connection.query(
          query,
          [first_name, last_name, address, email, phone_number, credit_card_info, password],
          (err, result) => {
            if (err) reject(new Error(err.message));
            else resolve(result.insertId);
          }
        );
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

// Check login credentials
async checkClientLogin(email, password) {
    try {
      // Validation: check for empty input
      if (!email || !password) {
        throw new Error("Email and password must be provided.");
      }
  
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT client_id, first_name, email FROM clients WHERE email = ? AND password = ?;";
        connection.query(query, [email, password], (err, results) => {
          if (err) {
            console.error("Database query error:", err.message);
            reject(new Error("Failed to verify login credentials."));
          } else {
            resolve(results);
          }
        });
      });
  
      return response;
    } catch (err) {
      console.error("Error in checkClientLogin:", err.message);
      throw err; // Re-throw for proper handling in routes
    }
  }

  async submitQuoteResponse(request_id, responder, note, counter_price, work_start_date, work_end_date, created_at) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = `
                INSERT INTO quoteresponses (request_id, responder, note, counter_price, work_start_date, work_end_date, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
            connection.query(query, [request_id, responder, note, counter_price, work_start_date, work_end_date, created_at], (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.insertId);
            });
        });
        return { response_id: response };
    } catch (error) {
        console.error(error);
    }
}

    // Fetch responses for a specific request
    async getQuoteResponses(request_id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM quoteresponses WHERE request_id = ?;";
                connection.query(query, [request_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = DbService;