import React from 'react';
import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';

import './App.css'

import SampleListPage from './pages/SampleListPage';
import SampleEditPage from './pages/SampleEditPage';
import SampleSharePage from './pages/SampleSharePage';

/**
 * The router for the list page, share page, edit page. 
 * @returns the Browser Router of List, Share, Edit
 */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index
            element={<SampleListPage />} 
          />
          <Route 
            path='/share/:sampleId'
            element={<SampleSharePage />}
          />
          <Route 
            path='/edit/:sampleId' 
            element={<SampleEditPage />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
 
/**
 * The header + layout of the page 
 * Subsequent content shall be displayed through the Outlet component
 * @returns The entire page 
 */
const Layout = () => {
  console.log(`
  ░██╗░░░░░░░██╗███████╗██╗░░░░░░█████╗░░█████╗░███╗░░░███╗███████╗██╗
  ░██║░░██╗░░██║██╔════╝██║░░░░░██╔══██╗██╔══██╗████╗░████║██╔════╝██║
  ░╚██╗████╗██╔╝█████╗░░██║░░░░░██║░░╚═╝██║░░██║██╔████╔██║█████╗░░██║
  ░░████╔═████║░██╔══╝░░██║░░░░░██║░░██╗██║░░██║██║╚██╔╝██║██╔══╝░░╚═╝
  ░░╚██╔╝░╚██╔╝░███████╗███████╗╚█████╔╝╚█████╔╝██║░╚═╝░██║███████╗██╗
  ░░░╚═╝░░░╚═╝░░╚══════╝╚══════╝░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚══════╝╚═╝`);
  return (
    <div className='app-container'>
      <nav className='app-header'>
        <div className='app-header-wrapper'>
          <div className='app-logo'>OgCiSum SaberFate/Pei YunFei</div>
          <div style={{flex: 1, minWidth: '16px'}}></div>
          <div className='app-tips'>Create & Share Samples, Listen in Mobile App!</div>
        </div>
      </nav>
      <Outlet />
      <div className='app-footer'></div>
    </div>
  );
}

export default App;
