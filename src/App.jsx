import './App.css'
import {ListArticles} from "./Components/ListArticles.jsx";
import {Comments} from "./Components/Comments.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Comments articleId={1}/>
    </>
  )
}

export default App
