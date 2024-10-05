import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Feed from './Feed';
import Login from './Login';

const Body = () => {
  const userBrowser = createBrowserRouter([
    {
      path: '/', // Main layout route
      element: <Home />, // Home layout with Outlet
      children: [
        {
          path: '', // Render Feed on the root `/` inside Home
          element: <Feed />
        },
        {
          path: 'profile/:id', // Profile should be relative path inside Home
          element: <Profile />
        },
      ]
    },
    {
      path: '/login', // Separate login route
      element: <Login />
    }
  ]);

  return (
    <div>
      <RouterProvider router={userBrowser} />
    </div>
  );
};

export default Body;
