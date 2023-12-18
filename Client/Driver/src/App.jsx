import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import HomePage from './Pages/homepage/HomePage';
import NotFound from './Pages/NotFound/NotFound';
import Loadsk from './Loadsk';


const Login = lazy(() => import('./Pages/login/Login'))
const Signup = lazy(() => import('./Pages/CreateAccount/SignUp'))
const RestorePwd = lazy(() => import('./Pages/RestorePassword/RestorePassword'))
const Parcels = lazy(() => import('./Pages/ParcelsAllViews/ParcelsView'))
const Settings = lazy(() => import('./Pages/UserAccount/Usrsettings'))


const App = () => {
  const navigate = useNavigate();
  return (
    
      <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/login" element={
              <ErrorBoundary
                FallbackComponent={<NotFound/>}
                onReset={() => navigate('/')}>
                <Suspense fallback = {<Loadsk/>}>
                  <Login />
                </Suspense>
              </ErrorBoundary>} 
            />
            
            <Route path="/signup" element={
              <ErrorBoundary
                FallbackComponent={<NotFound/>}
                onReset={() => navigate('/')}>
                <Suspense fallback = {<Loadsk/>}>
                  <Signup />
                </Suspense>
              </ErrorBoundary>} 
            />

            <Route path="/RestorePassword" element={
              <ErrorBoundary
                FallbackComponent={<NotFound/>}
                onReset={() => navigate('/')}>
                <Suspense fallback = {<Loadsk/>}>
                  <RestorePwd />
                </Suspense>
              </ErrorBoundary>} 
            />


            <Route path="/parcels" element={
              <ErrorBoundary
                FallbackComponent={<NotFound/>}
                onReset={() => navigate('/')}>
                <Suspense fallback = {<Loadsk/>}>
                  <Parcels />
                </Suspense>
              </ErrorBoundary>} 
            />


            <Route path="/settings" element={
              <ErrorBoundary
                FallbackComponent={<NotFound/>}
                onReset={() => navigate('/')}>
                <Suspense fallback = {<Loadsk/>}>
                  <Settings />
                </Suspense>
              </ErrorBoundary>} 
            />


            <Route path = '*' element = {<NotFound />} />
        </Routes>
      </div>
    
  );
};

export default App;