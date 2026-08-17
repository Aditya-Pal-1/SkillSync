import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/authContext'
import { EventProvider } from './context/eventContext'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime : 1000*60*5, //5 minutes
      cacheTime:1000*60*10, //10 minutes
      refetchOnWindowFocus:false,
     retry:1, 
    }
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
    <AuthProvider>
      <EventProvider>
      <QueryClientProvider client={queryClient}>
        <App  status={true}/>
      </QueryClientProvider>
      </EventProvider>
      </AuthProvider>  
            
    </BrowserRouter>
  </StrictMode>,
)
