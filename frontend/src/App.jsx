import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ConfirmAccount from './pages/ConfirmAccount'
import NewPassword from './pages/NewPassword'
import AdminPage from './pages/admin/AdminPage'
import AdminLayout from './layout/AdminLayout'
import RootRedirect from './components/RootRedirect'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />} >
            <Route index element={<RootRedirect />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password/:token' element={<NewPassword />} />
            <Route path='confirm/:token' element={<ConfirmAccount />} />
          </Route>

          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
