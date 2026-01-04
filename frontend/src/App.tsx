import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route';
import { PublicRoute } from './components/public-route';
import LoginViewModel from './features/auth/login/login.view-model';
import RegisterViewModel from './features/auth/register/register.view-model';
import CategoriesViewModel from './features/categories/categories.view-model';
import DashboardViewModel from './features/dashboard/dashboard.view-model';
import HomeViewModel from './features/dashboard/home.view-model';
import ProfileViewModel from './features/profile/profile.view-model';
import TransactionsViewModel from './features/transactions/transactions.view-model';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginViewModel />} />
          <Route path="/register" element={<RegisterViewModel />} />
        </Route>
        
        <Route element={<ProtectedRoute />}>
           <Route element={<DashboardViewModel />}>
             <Route path="/" element={<HomeViewModel />} />
             <Route path="/transactions" element={<TransactionsViewModel />} />
             <Route path="/categories" element={<CategoriesViewModel />} />
             <Route path="/profile" element={<ProfileViewModel />} />
           </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
