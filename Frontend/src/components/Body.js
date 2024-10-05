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
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Feed from './Feed';
import Login from './Login';

const Body = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Feed />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Body;
g