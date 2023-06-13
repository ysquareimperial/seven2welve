import { useRoutes } from 'react-router-dom'
import AppIndex from './AppIndex'
import Home from '../pages/Home'
import Post from '../pages/Post'
import PostCreate from '../pages/PostCreate'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PageNotFound from '../pages/PageNotFound'
import Profile from '../pages/Profile'

function AppNavigation() {
  let element = useRoutes([
    {
      path: '/',
      element: <Login />,
      children: [{ index: true }],
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
    {
      element: <AppIndex />,
      children: [
        { index: true, element: <AppIndex /> },
        { path: '/feed', element: <Home /> },
        {
          path: '/post/:id',
          element: <Post />,
        },
        {
          path: '/create-post',
          element: <PostCreate />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
      ],
    },
  ])
  return element
}
export default AppNavigation
