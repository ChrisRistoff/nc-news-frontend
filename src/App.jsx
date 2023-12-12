import './App.css'
import {ListArticles} from "./Components/ListArticles.jsx";
import {Route, Routes} from "react-router-dom";
import {Article} from "./Components/Article.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./Components/Header.jsx";
import {LogIn} from "./Components/LogIn.jsx";
import {Register} from "./Components/Register.jsx";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path={"/login"} element={<LogIn />} />
        <Route path={"/signup"} element={<Register />} />
        <Route path={"/"} element={<ListArticles />} />
        <Route path={"/articles/:id"} element={<Article />} />
      </Routes>
    </>
  )
}

export default App
