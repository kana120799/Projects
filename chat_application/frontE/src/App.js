import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexForm from "./component/IndexForm";
import ChatRoom from "./component/ChatRoom";
import { NavLink } from "react-router-dom";
function App() {
  return (
    <>
      <div className="top"></div>
      <div className="container-fluid top " style={{ height: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<IndexForm />} />
            <Route path="chat/:roomId" element={<ChatRoom />} />
            <Route
              path="*"
              element={
                <h1>
                  404 not found...
                  <br></br>
                  <div>
                    Go to Home Page.&nbsp;
                    <NavLink to="/">click</NavLink>
                  </div>
                </h1>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
