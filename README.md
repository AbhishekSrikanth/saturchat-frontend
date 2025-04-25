# SaturChat Frontend

This is the React-based frontend for **SaturChat**, a modern, collaborative group chat platform. It provides a clean and responsive UI with support for real-time messaging, group management, user profiles, and AI-generated responses.

---

## Features

- Built with **React 19** and **Vite**
- Modular real-time chat UI (WebSocket-powered)
- User authentication via JWT
- Profile management with API keys and avatars
- Seamless integration with AI bots
- TailwindCSS for styling

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/AbhishekSrikanth/saturchat-frontend.git
cd saturchat-frontend
```

### 2. Configure Environment

Create a `.env.production` file with your deployment variables:

```env
VITE_API_BASE_URL=https://yourdomain.com/api
VITE_WS_BASE_URL=wss://yourdomain.com/ws
```

### 3. Run Locally

```bash
npm install
npm run dev
```

Access the app at: `http://localhost:5173`

---

## Deployment Notes

- NGINX should be configured to serve `index.html`.
- Ensure proper CORS and proxy configuration for API calls and WebSocket connections.
- This app should be used  [`saturchat-backend`](https://github.com/YOUR_USERNAME/saturchat-backend) for full-stack deployment.

---

## License

This project is licensed under the MIT License.
