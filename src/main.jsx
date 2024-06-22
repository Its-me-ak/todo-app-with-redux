import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiData } from './slice/apiSlice.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ApiProvider api={apiData}>
        <App />
      </ApiProvider>
    </BrowserRouter>
)
