import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts.jsx';
import Following from './pages/Following.jsx';
import { useEffect, useState } from 'react';

function App() {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetch('/api/me')
        // if not authenticated or failed request, return null
        .then(response => response.ok ? response.json() : null)
        .then(user => setCurrentUser(user))
    }, [])

    console.log(currentUser)

    return (
        <BrowserRouter>
            <div className='container py-5 row d-flex justify-content-center' id="main">
                <Routes>
                    <Route path="/" element={ <AllPosts user={ currentUser } /> } />
                    <Route path="/following" element={ <Following /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App