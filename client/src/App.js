import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPost from "./pages/AddPost";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "antd/dist/antd.css";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "./Redux/action/postAction";
import { getAllUsers } from "./Redux/action/userAction";
import AllUsers from "./pages/AllUsers";
import EditProfile from "./pages/EditProfile";
function App() {
  const { loading, likeorunlikeloading } = useSelector(
    (state) => state.alertsReducers
  );
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  useEffect(() => {
    if (user) {
      // console.log(parsedUser._id)
      dispatch(getAllPost());
     
    }
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div>
      {(loading || likeorunlikeloading) && (
        <div className="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/" exact element={user ? <Home /> : <Login />} />
          <Route
            path="/profile/:userId"
            exact
            element={user ? <Profile /> : <Login />}
          />
          <Route
            path="/addpost"
            exact
            element={user ? <AddPost /> : <Login />}
          />
           <Route
            path="/allUser"
            exact
            element={user ? <AllUsers/> : <Login />}
          />
           <Route
            path="/editprofile"
            exact
            element={user ? <EditProfile/> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// export const protectedRoutes = (props)=>{
//     const user = localStorage.getItem('user')
//     if(user){
//       return <Route {...props} />
//     }else{
//       return <Navigate to="/login"/>
//     }
// }
