import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThreadProvider } from './context/threadContext.tsx'
import { UserProvider } from './context/userContext.tsx'

//import { initLocalStorage } from './utils/initLocalStorage.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThreadProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThreadProvider>
  </StrictMode>,
)
