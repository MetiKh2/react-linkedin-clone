import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router";
import { getUserAuth } from "./actions";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";

function App(props) {
  useEffect(() => {
    props.getUserAuth()
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
    </div>
  );
}

const mapStateToProps=(state)=>{
  return{
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    getUserAuth:()=>dispatch(getUserAuth())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
