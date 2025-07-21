# IMS Project

This is a full-stack Inventory Management System (IMS) project.

## Frontend
- React + Vite + Tailwind CSS
- Located in the `frontend` folder

## Backend
- Node.js + Express
- JWT authentication, hashed passwords, login/register endpoints
- Located in the `backend` folder

## How to Run

### Backend
1. Open a terminal in the `backend` folder
2. Run `npm install` (if not already done)
3. Run `npm start` to start the backend server on http://localhost:3001

### Frontend
1. Open a terminal in the `frontend` folder
2. Run `npm install` (if not already done)
3. Run `npm run dev` to start the frontend server

---

## Authentication Endpoints
- `POST /register` — Register a new user
- `POST /login` — Login and receive JWT token
- `GET /profile` — Example protected route (requires JWT in Authorization header)

---

## Customization
- Update `JWT_SECRET` in `backend/index.js` for production use
- Connect frontend to backend endpoints for authentication and inventory features
