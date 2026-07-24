import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'material-icons/iconfont/outlined.css';
import './globals.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
