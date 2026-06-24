import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts.jsx';
import Following from './pages/Following.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <AllPosts /> } />
                <Route path="/following" element={ <Following /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App