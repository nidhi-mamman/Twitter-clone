// import React from 'react'
// import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import Home from './Home'
// import Profile from './Profile'
// import Feed from './Feed'
// import Login from './Login'
// // import { Bookmarks } from ''
// const Body = () => {
//     const userbrowser=createBrowserRouter([
//         {
//             path:"/",
//             element:<Home/>,
//             children:[
//               {
//                 path:'/',
//                 element:<Feed/>
//               },
//               {
//                 path:'/profile/:id',
//                 element:<Profile/>
//               }
//             ]

//         },
//         {
//             path:"/login",
//             element:<Login/>    
//         }
//     ])
//   return (
//     <div>
//       <RouterProvider router={userbrowser}/>
//     </div>
//   )
// }

// export default Body
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Feed from './Feed';
import Login from './Login';

const Body = () => {
  return (
      <Routes>
        {/* Main Home route */}
        <Route path="/" element={<Home />}>
          {/* Child routes under Home */}
          <Route index element={<Feed />} />  {/* This acts as the default route under Home */}
          <Route path="profile/:id" element={<Profile />} />
        </Route>

        {/* Login route */}
        <Route path="/login" element={<Login />} />
      </Routes>
  );
};

export default Body;