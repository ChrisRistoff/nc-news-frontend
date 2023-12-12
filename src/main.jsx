import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {LoggedInProvider} from "./contexts/loggedInContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoggedInProvider>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </LoggedInProvider>
)
