import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./components/add-item"
import ItemList from "./components/item-list"
import Item from "./components/item"
import Login from "./components/login"

function App() {

  const [user, setUser] = React.useState(null)

  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/items" className="navbar-brand">
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

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/items"]} component={ItemList} />
          <Route
            path="/items/:id/items"
            render={(props) => (
              <AddItem {...props} user={user} />
            )}
          />
          <Route
            path="/items/:id"
            render={(props) => (
              <Item {...props} user={user} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  )
}
export default App;
