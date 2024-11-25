import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import WebSocketProvider from "./contexts/WebSocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <WebSocketProvider>
    <App />
  </WebSocketProvider>
);
