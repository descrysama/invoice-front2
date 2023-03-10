import React from 'react';
import { Login } from './views/auth/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProtectAuth, ProtectDashboard } from './middlewares/ProtectedRoute';
import SideBar from './components/Sidebar';
import Home from './views/dashboard/Home';
import Products from './views/dashboard/Products';
import Categories from './views/dashboard/Categories';
import Profil from './views/dashboard/Profil';

import Customers from './views/dashboard/Customers';
import Repairs from './views/dashboard/Repairs';
import Quotes from './views/dashboard/Quotes';
import CreateQuote from './views/dashboard/CreateQuote';
import Invoices from './views/dashboard/Invoices';
import CreateInvoice from './views/dashboard/CreateInvoice';
import TicketTemplate from './templates/tickets/TicketTemplate';


function App() {

  const auth = useSelector(state => state.store);

  return (

    <BrowserRouter>
      {auth.isAuth ?
      <SideBar/> : null}
        <Routes>
          <Route path='/' element={<Navigate to={auth.isAuth ? "/dashboard" : "/login"} replace/>}></Route>
          <Route path="/login" element={<ProtectAuth><Login/></ProtectAuth>}></Route>
          <Route path='/dashboard' element={<ProtectDashboard><Home/></ProtectDashboard>}></Route>
          <Route path='/products' element={<ProtectDashboard><Products/></ProtectDashboard>}></Route>
          <Route path='/categories' element={<ProtectDashboard><Categories/></ProtectDashboard>}></Route>
          <Route path='/profile' element={<ProtectDashboard><Profil/></ProtectDashboard>}></Route>
          <Route path='/repairs' element={<ProtectDashboard><Repairs/></ProtectDashboard>}></Route>
          <Route path='/customers' element={<ProtectDashboard><Customers/></ProtectDashboard>}></Route>
          <Route path='/quotes' element={<ProtectDashboard><Quotes/></ProtectDashboard>}></Route>
          <Route path='/quotes/create' element={<ProtectDashboard><CreateQuote/></ProtectDashboard>}></Route>
          <Route path='/invoices' element={<ProtectDashboard><Invoices/></ProtectDashboard>}></Route>
          <Route path='/invoices/create' element={<ProtectDashboard><CreateInvoice/></ProtectDashboard>}></Route>
          <Route path='/tickettemplate' element={<TicketTemplate/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
