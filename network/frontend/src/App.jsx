import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts.jsx';
import Following from './pages/Following.jsx';

function App() {
    return (
        <BrowserRouter>
            <div className='container py-5 row d-flex justify-content-center' id="main">
                <Routes>
                    <Route path="/" element={ <AllPosts /> } />
                    <Route path="/following" element={ <Following /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App