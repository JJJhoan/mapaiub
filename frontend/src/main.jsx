import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import router from "./Router";
import "./index.css";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router}>
          <Toaster 
            position="bottom-right" 
            reverseOrder={false}
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #334155',
              },
            }} 
          />
        </RouterProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);