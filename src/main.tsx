import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("[BOOT] VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("[BOOT] VITE_SUPABASE_PUBLISHABLE_KEY:", import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ? "SET" : "MISSING");

createRoot(document.getElementById("root")!).render(<App />);
