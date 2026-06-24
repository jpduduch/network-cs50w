import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <AllPosts /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App