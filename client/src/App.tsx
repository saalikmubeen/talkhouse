import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { autoLogin } from './actions/authActions';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AlertNotification from "./components/AlertNotification"

function App() {

    const dispatch = useDispatch();

    

  // auto login
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch])
  
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
          </BrowserRouter>
          <AlertNotification />
      </>
  );
}

export default App;
