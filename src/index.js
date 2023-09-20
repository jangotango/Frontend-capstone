import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./authContext";
import App from "./App"; // Replace with your main app component

// Use createRoot to start rendering the app
const root = document.getElementById('root');
const app = (
  <AuthProvider>
    <App />
  </AuthProvider>
);

const rootElement = ReactDOM.createRoot(root);
rootElement.render(app);