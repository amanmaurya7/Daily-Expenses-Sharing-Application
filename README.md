# Daily Expenses Sharing App

This is a simple backend service that helps manage daily expenses and makes splitting bills with friends or roommates easier. Built with Node.js, Express, and MongoDB, it offers a convenient way to track spending and share costs.

## Key Features

### User Management
- **Sign Up & Log In**: Users can register and sign in to the app securely.
- **Authorization**: Uses JWT tokens to protect user sessions.

### Expense Management
- **Track Expenses**: Add and keep track of daily expenses.
- **Flexible Bill Splitting**:
  - Split bills equally between users.
  - Divide expenses by exact amounts.
  - Allocate costs based on custom percentages.
- **Expense History & Balance**: View past expenses and a clear breakdown of who owes what.

### Data Export
- **Export Reports**: Download detailed expense reports in Excel format.
- **Balance Sheets**: Export balance sheets to track all financial settlements.

## Before You Begin

Make sure you have:
- Node.js (version 14 or higher)
- MongoDB installed and running
- npm or yarn for managing dependencies

## How to Set It Up

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amanmaurya7/Expense-Sharing.git
   cd expense-sharing
   
2. Install dependencies:
```bash
npm install
npm install express mongoose joi jsonwebtoken bcryptjs cors dotenv express-async-handler pdfkit exceljs
npm install --save-dev jest supertest
```

3. Create a .env file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/expense_sharing
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

# API Documentation
## 1. User Registration
### Register first user (Rahul)
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Rahul",
  "email": "rahul@example.com",
  "mobileNumber": "9876543210",
  "password": "password123"
}'

### Register second user (Priya)
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Priya",
  "email": "priya@example.com",
  "mobileNumber": "8765432109",
  "password": "password123"
}'

### Register third user (Rohit)
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Rohit",
  "email": "rohit@example.com",
  "mobileNumber": "7654321098",
  "password": "password123"
}'

## 2. User Login (Save the tokens returned)
### Login as Rahul
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "rahul@example.com",
  "password": "password123"
}'

### Save the token received in response for Rahul
export RAHUL_TOKEN="<token_from_response>"

## 3. Create Expenses with Different Split Types

### 3.1 Equal Split Example
### Rahul pays for lunch (equal split)
curl -X POST http://localhost:3000/api/expenses \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $RAHUL_TOKEN" \
-d '{
  "description": "Lunch",
  "amount": 1500,
  "splitType": "EQUAL",
  "splits": [
    {"userId": "<rahul_id>"},
    {"userId": "<priya_id>"},
    {"userId": "<rohit_id>"}
  ]
}'

### 3.2 Exact Split Example
### Priya pays for shopping (exact split)
curl -X POST http://localhost:3000/api/expenses \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $PRIYA_TOKEN" \
-d '{
  "description": "Shopping",
  "amount": 5000,
  "splitType": "EXACT",
  "splits": [
    {"userId": "<rahul_id>", "share": 1000},
    {"userId": "<priya_id>", "share": 2500},
    {"userId": "<rohit_id>", "share": 1500}
  ]
}'

### 3.3 Percentage Split Example
### Rohit pays for a party (percentage split)
curl -X POST http://localhost:3000/api/expenses \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ROHIT_TOKEN" \
-d '{
  "description": "Party",
  "amount": 8000,
  "splitType": "PERCENTAGE",
  "splits": [
    {"userId": "<rahul_id>", "share": 40},
    {"userId": "<priya_id>", "share": 30},
    {"userId": "<rohit_id>", "share": 30}
  ]
}'

## 4. View Expenses

### 4.1 View Individual Expenses
### Get Rahul's expenses
curl http://localhost:3000/api/expenses/user \
-H "Authorization: Bearer $RAHUL_TOKEN"

### 4.2 View All Expenses
### Get all expenses
curl http://localhost:3000/api/expenses \
-H "Authorization: Bearer $RAHUL_TOKEN"

## 5. Download Balance Sheet
### Download Rahul's balance sheet
curl http://localhost:3000/api/expenses/balance-sheet \
-H "Authorization: Bearer $RAHUL_TOKEN" \
--output rahul_balance_sheet.xlsx


# Expected Results

### Equal Split Example Result
For the lunch expense of ₹1500:

- Each person should owe ₹500.
- The balance sheet should show:
- Rahul paid: ₹1500
- Priya owes: ₹500
- Rohit owes: ₹500

### Exact Split Example Result
For the shopping expense of ₹5000:

- Rahul owes: ₹1000
- Priya paid: ₹5000
- Rohit owes: ₹1500
- The balance sheet will reflect these exact amounts.

### Percentage Split Example Result
For the party expense of ₹8000:

- Rahul owes: ₹3200 (40%)
- Priya owes: ₹2400 (30%)
- Rohit paid: ₹8000
- The final settlement should show these percentages converted to amounts.
