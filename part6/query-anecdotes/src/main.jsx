import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'

const queryClient = new QueryClient()
import { NotificationContextProvider } from './NotificationContext.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </StrictMode>
  </QueryClientProvider>
)