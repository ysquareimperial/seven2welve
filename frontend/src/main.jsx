import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './Helpers/AuthContext.js'

// const [authState, setAuthState] = useState(false)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext.Provider value={{}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext.Provider>
  </React.StrictMode>,
)
