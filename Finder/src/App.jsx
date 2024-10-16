

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Link,
} from "react-router-dom";
;



import Login from "./pages/Login";

import Nav from "./components/Nav/nav";

import Main from "./components/Main/main";

const DashBoard = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Main/>
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/home",
    element: <DashBoard/>,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;