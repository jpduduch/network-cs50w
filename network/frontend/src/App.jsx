import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPosts from './pages/AllPosts.jsx';
import Following from './pages/Following.jsx';
import Profile from './pages/Profile.jsx';
import { useEffect, useState } from 'react';

function App() {

    return (
        <BrowserRouter>
            <div className='container py-5 row d-flex justify-content-center' id="main">
                <Routes>
                    <Route path="/" element={ <AllPosts /> } />
                    <Route path="/following/" element={ <Following /> } />
                    <Route path="/user/:username" element={ <Profile /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App