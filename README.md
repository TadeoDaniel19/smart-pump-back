# Smart Pump API

This is the backend for the Smart Pump API, built with TypeScript, Express, and lowdb.

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smart-pump-api.git
cd smart-pump-api

# Install dependencies
npm install
```

## 🛠️ Available Scripts

- `npm run dev` 
  Start the server in development mode with hot-reloading (ts-node-dev).

- `npm run build`  
  Compile TypeScript sources into the `dist` directory using `tsc`.

- `npm start`  
  Run the compiled code with Node from `dist/index.js`.

- `npm test`  
  Execute the test suite with Jest in single-thread mode (`--runInBand`).

- `npm run format`  
  Format code and documentation files in `src/**/*.{ts,tsx,js,json,md}` using Prettier (single quotes and semicolons).

## 📦 Project Structure

```
.
├── src
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── db.ts
│   └── index.ts
├── data/
│   └── users.json
├── jest.config.js
├── tsconfig.json
├── .prettierrc.json
└── package.json
```

## 🔧 Basic Usage

1. Start the server in development mode:  
   ```bash
   npm run dev
   ```

2. Access the API at \`http://localhost:3000\`.

3. Run tests:  
   ```bash
   npm test
   ```

4. Format the code:  
   ```bash
   npm run format
   ```
