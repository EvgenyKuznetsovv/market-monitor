import React from 'react';
import Candles from './pages/Candles/Candles';
import PriceChange from './pages/PriceChange/PriceChange'
import Prices from './pages/Home/Home'
import Navigation from './components/Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Navigation />
    	<Routes>
			  <Route path='/' element={<Prices />} />
        <Route path='/price-history' element={<PriceChange />} />
			  <Route path='/candles' element={<Candles />} />
		  </Routes>
    </>

	)
}

export default App;
