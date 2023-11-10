import { useDispatch } from "react-redux";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { checkLoggedIn} from "./redux/actions/authActionCreator";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkLoggedIn());
  },[])
  return (
      <Router>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard/*" element={<Dashboard/>}/>
        </Routes>
      </Router>
  );
}

export default App;
