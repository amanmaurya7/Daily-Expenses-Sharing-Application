# Daily Expenses Sharing App

This is a simple backend service that helps manage daily expenses and makes splitting bills with friends or roommates easier. Built with Node.js, Express, and MongoDB, it offers a convenient way to track spending and share costs.

## Key Features

### User Management
- **Sign Up & Log In**: Users can register and sign in to the app securely.
- **Authorization**: Uses JWT tokens to protect user sessions.
- **Profile Management**: Users can update their personal information as needed.

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
   git clone <repository-url>
   cd expense-sharing
   
2. Install dependencies:
```bash
npm install
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

## API Documentation

### User Endpoints

#### POST /api/users/register