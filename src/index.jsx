import React from 'react'
import App from './app/App'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import * as serviceWorker from './serviceWorker'
import { StyledEngineProvider } from '@mui/styled-engine'
import { CssBaseline } from '@mui/material'
import style from 'Assets/style.css'


// window.onbeforeunload = function (e) {
//     const tabIsBeingRefreshed = performance.navigation.type === 1;
    
//     if (!tabIsBeingRefreshed) {
//         localStorage.clear(); // Clear local storage when the user closes the tab
//     }
// };
// Check if the page is being refreshed
// window.addEventListener('beforeunload', function() {
//     // Clear local storage when the user closes the tab
//     localStorage.clear();
// });
ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <HashRouter>
            <CssBaseline />
            <App />
        </HashRouter>
    </StyledEngineProvider>,
    document.getElementById('root')
)

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
