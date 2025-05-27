import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Layout from './components/Layout'
import Home from './views/Home.jsx'
import { Login } from './auth/Login'
import Register from './auth/Register'
import AdminDashboard from './views/adminDashboard/index.jsx'
import EmployeeDashboard from './views/employeeDashboard/index.jsx'
import UserProfile from './views/profile/index.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<UserProfile/>} />
          <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
          <Route path='/employee-dashboard' element={<EmployeeDashboard/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
