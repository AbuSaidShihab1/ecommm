import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Appprovider } from './context/Appcontext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CustomerProvider } from './context/CustomerContext.jsx'
import { SuperProvider } from './context/Superprovider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Appprovider>
    <CustomerProvider>
      <SuperProvider>
       <App/>
      </SuperProvider>
    </CustomerProvider>
  </Appprovider>
  </BrowserRouter>
 ,
)
