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
            console.error(err);
            throw err;
        }
    }

    // Check login credentials
    async checkClientLogin(email, password) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT client_id, first_name, email FROM clients WHERE email = ? AND password = ?;";
                connection.query(query, [email, password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (err) {
            console.error("Error in checkClientLogin:", err);
            throw err;
        }
    }

async submitQuoteRequest(client_id, property_address, square_feet, proposed_price, note, created_at, request_id = null) {
    try {
        const response = await new Promise((resolve, reject) => {
            let query;
            const params = [];

            if (request_id) {
                // Accept an existing request: Update status to "Submitted"
                query = `
                    UPDATE requestforquotes 
                    SET status = 'Submitted', updated_at = NOW() 
                    WHERE request_id = ?;
                `;
                params.push(request_id);
            } else {
                // Create a new quote request with status "Pending"
                query = `
                    INSERT INTO requestforquotes 
                    (client_id, property_address, square_feet, proposed_price, note, status, created_at)
                    VALUES (?, ?, ?, ?, ?, 'Pending', ?);
                `;
                params.push(client_id, property_address, square_feet, proposed_price, note, created_at);
            }

            connection.query(query, params, (err, result) => {
                if (err) {
                    console.error("Database Error:", err.message);
                    reject(new Error(err.message));
                } else {
                    resolve(result);
                }
            });
        });

        return response;
    } catch (err) {
        console.error("Error in submitQuoteRequest:", err);
        throw err;
    }
}

async respondToQuoteRequest(request_id, responder, note, counter_price, work_start_date, work_end_date, created_at) {
    try {
        // Insert into quoteresponses
        const insertResponse = await new Promise((resolve, reject) => {
            const insertQuery = `
                INSERT INTO quoteresponses 
                (request_id, responder, note, counter_price, work_start_date, work_end_date, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
            connection.query(
                insertQuery,
                [request_id, responder, note, counter_price, work_start_date, work_end_date, created_at],
                (err, result) => {
                    if (err) {
                        console.error("Error inserting into quoteresponses:", err.message);
                        reject(err);
                    } else {
                        console.log("Insert Successful. Affected Rows:", result.affectedRows);
                        resolve(result);
                    }
                }
            );
        });

        // Update requestforquotes table to set status = "Submitted"
        const updateStatus = await new Promise((resolve, reject) => {
            const updateQuery = `
                UPDATE requestforquotes 
                SET status = 'Submitted', updated_at = NOW() 
                WHERE request_id = ?;
            `;
            connection.query(updateQuery, [request_id], (err, result) => {
                if (err) {
                    console.error("Error updating requestforquotes:", err.message);
                    reject(err);
                } else {
                    console.log("Update Successful. Affected Rows:", result.affectedRows);
                    resolve(result);
                }
            });
        });

        return { insertResponse, updateStatus };
    } catch (err) {
        console.error("Error in respondToQuoteRequest:", err);
        throw err;
    }
}

    // Fetch all quotes for a specific client (Pending or Accepted)
    async getQuoteResponsesByClientId(client_id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                    SELECT qr.request_id, qr.responder, qr.note, qr.counter_price, 
                           qr.work_start_date, qr.work_end_date, rq.property_address, rq.square_feet
                    FROM quoteresponses qr
                    JOIN requestforquotes rq ON qr.request_id = rq.request_id
                    WHERE rq.client_id = ?;
                `;
                connection.query(query, [client_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (err) {
            console.error("Error fetching quote responses:", err);
            throw err;
        }
    }
    

    // Fetch all pending requests
    async getPendingRequests() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM requestforquotes WHERE status = 'Pending';";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (err) {
            console.error("Error fetching pending requests:", err);
            throw err;
        }
    }

    async acceptQuoteAndCreateOrder(request_id, client_id, agreed_price, work_start_date, work_end_date) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO orders (request_id, client_id, agreed_price, work_start_date, work_end_date, status, created_at)
                    VALUES (?, ?, ?, ?, ?, 'Pending', NOW());
    
                    UPDATE requestforquotes SET status = 'Submitted' WHERE request_id = ?;
                `;
                connection.query(
                    query,
                    [request_id, client_id, agreed_price, work_start_date, work_end_date, request_id],
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        else resolve(result);
                    }
                );
            });
            return response;
        } catch (err) {
            console.error("Error accepting quote and creating order:", err);
            throw err;
        }
    }

    async getAllOrders() {
        try {
          const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM orders;";
            connection.query(query, (err, results) => {
              if (err) reject(new Error(err.message));
              else resolve(results);
            });
          });
          return response;
        } catch (err) {
          console.error("Error fetching orders:", err);
          throw err;
        }
      }

    // Utility function for query execution
    async executeQuery(query, params) {
        return new Promise((resolve, reject) => {
            connection.query(query, params, (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
    }
}

module.exports = DbService;