import React from 'react';
import Candles from './pages/Candles/Candles';
import PriceChange from './pages/PriceChange/PriceChange';
import Navigation from './components/Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/price-history" element={<PriceChange />} />
                <Route path="/candles" element={<Candles />} />
            </Routes>
        </>
    );
}

export default App;
