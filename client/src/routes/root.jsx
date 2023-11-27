// import {
//     createBrowserRouter,
//     RouterProvider,
//   } from "react-router-dom";
// import Home from '../pages/Home/Home';
// import Login from '../pages/Login/Login';
// import Sign from '../pages/Sign/Sign';
// import Start from '../pages/Start/Start';
// import Error from '../pages/Error/Error';

// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Home />,
//       errorElement: <Error />,
//       children: [
//         {
//             path: "/login",
//             element: <Login />,
//             errorElement: <Error />
//         },
//         {
//             path: "/signin",
//             element: <Sign />,
//             errorElement: <Error />
//         },
//         {
//             path: "/start",
//             element: <Start />,
//             errorElement: <Error />
//         },
//       ]
//     }
//   ]);

//   export default router;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Sign from "../pages/Sign/Sign";
import Start from "../pages/Start/Start";
import Error from "../pages/Error/Error";
import Game from "../pages/Game/Game";
import Result from "../pages/Result/Result";

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" index={true} element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/start" element={<Start />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<Error />} />
      </Routes>
  );
};

export default AppRouter;
