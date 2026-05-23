import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx';
import PostDisplay from './Components/PostDisplay.jsx';
import Categorized from './pages/Categorized.jsx';
import CreatePost from './pages/CreatePost.jsx';
import {AppProvider} from './Context.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children :[
      {path : '', element : <Home/>},
      {path : ":id", element: <PostDisplay/>},
      {path : 'about', element : <About/>},
      {path : 'contact', element : <Contact/>},
      {path : 'categorized',element : <Categorized/>,},
    ]
  },
  {path : 'createPost', element : <CreatePost/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} onRouteChange={() => window.scrollTo(0, 0)}/>
    </AppProvider>
  </StrictMode>,
)
