import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./components/add-item"
import ItemList from "./components/item-list"
import Item from "./components/item"
import Login from "./components/login"

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Magic Items
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/items"} className="nav-link">
              Items
            </Link>
          </li>
          <li className="nav-item" >
            {user ? (
              <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}

          </li>
        </div>
      </nav>
    </div>
  )
}
export default App;
