import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts.jsx';
import Following from './pages/Following.jsx';
import Profile from './pages/Profile.jsx';
import { useEffect, useState } from 'react';

function App() {

    // checks if user is logged in to return post submission form
    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        fetch('/api/users/me/')
        // if not authenticated or failed request, return null
        .then(response => response.ok ? response.json() : null)
        .then(user => setCurrentUser(user))
    }, [])


    return (
        <BrowserRouter>
            <div className='container py-5 row d-flex justify-content-center' id="main">
                <Routes>
                    <Route path="/" element={ <AllPosts user={ currentUser } /> } />
                    <Route path="/following/" element={ <Following user={ currentUser } /> } />
                    <Route path="/user/:username" element={ <Profile user={ currentUser } /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App