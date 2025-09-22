import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './styles/global.css'
import App from './App'
const qc = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 60_000,
      refetchOnWindowFocus: false,
     }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={qc}>
 <App />
    </QueryClientProvider>
   </StrictMode>,
)
