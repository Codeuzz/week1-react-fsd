import ReactDOM from 'react-dom/client'
import './style.css' 
import App from './App.jsx'

let isChosen = true;

const returnClass = () => isChosen ? 'title-selected' : 'title-failure'


ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
