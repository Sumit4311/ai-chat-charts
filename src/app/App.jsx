import '../fake-db'
import React, { useEffect } from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { Routes, Route, Navigate, useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import { AllPages } from './routes/routes'
import sessionRoutes from "app/views/sessions/SessionRoutes";
import { getDataFromApi } from './services/CommonService'
import { getConversionAPI } from './services/api'
import "./style.css"

const App = () => {
    const all_pages = useRoutes(AllPages());
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(() => {
        const accessToken = localStorage?.getItem('accessToken');
        var isExists = sessionRoutes.some((route) => route.path === location.pathname);
        if (!isExists) {
            if (!accessToken) {
                navigate('/session/signin');
            }
        }
        else {
            if (accessToken) {
                navigate('/dashboard/default');
            }
        }
          if (accessToken) { TokeknChecking()}
    }, [navigate]);
    const TokeknChecking=async()=>{
      var response = await getDataFromApi(getConversionAPI + "?convaterFrom=" + "RAND" + "&convaterTo=" + 'RAND', 1)
      if(response.status===403){
        localStorage.clear();
        navigate('/session/signin');
      }
    }
    return (
      <Provider store={Store}>
        <SettingsProvider>
          <MatxTheme>
            <AuthProvider>
              {all_pages}
              <Routes>
                <Route path='/' element={<Navigate to="/dashboard/default" />} />
              </Routes>
            </AuthProvider>
          </MatxTheme>
        </SettingsProvider>
      </Provider>
    );
  };
export default App
