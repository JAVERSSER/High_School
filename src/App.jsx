import React from 'react'
import Header from './Components/Header'
import MainContent from './Components/MainContent'
import End from './Components/End'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop';
import Marqree from './Page/marquee'

import Pomodoro from './Page/pomodoro'
import Home from './Page/home'
import Study from './Page/study'
import Random from './Page/random'
import Game from './Page/game'
import Calculator from './Page/calcutator'

import Box1 from './Pakage/box1'
import Box2 from './Pakage/box2'
import Box3 from './Pakage/box3'
//Box
export default function App() {
  return (
    <div>
      <BrowserRouter>
       <ScrollToTop />
        <Header />
        {/* <Marqree/> // count visiter */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<Game />}></Route>
          <Route path='/pomodoro' element={< Pomodoro/>}></Route>
          <Route path='/random' element={<Random />}></Route>
          <Route path='/study' element={<Study />}></Route>
          <Route path='/calculator' element={<Calculator />}></Route>
        </Routes>

        <Routes>
          <Route path='/box1' element={<Box1 />}></Route>
          <Route path='/box2' element={<Box2 />}></Route>
          <Route path='/box3' element={<Box3 />}></Route>
        </Routes>

        <End />
      </BrowserRouter>
    </div>
  )
}

