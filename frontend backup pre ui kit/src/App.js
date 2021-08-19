import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./components/add-item"
import ItemList from "./components/item-list"
import Item from "./components/items"
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react'
import Homepage from './components/homepage';
import WorldMap from './components/WorldMap'
import './App.css'
import DiceRoller from './components/DiceRoller';
import Calendar from './components/Calendar'


function App() {

  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  if (!isAuthenticated) return (<Homepage />)

  return (
    <div>

      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a href="/items" className="navbar-brand">
          DM Tool
        </a>
        <div className="navbar-nav mr-auto">

          <DiceRoller />




          <li className="nav-item">
            <Link to={"/items"} className="nav-link">
              Item Repository
            </Link>

          </li>

          <li className="nav-item">
            <Link to={"/add-item"} className="nav-link">
              Submit an Item
            </Link>

          </li>

          <li className="nav-item">
            <Link to={"/map"} className="nav-link">
              World Map
            </Link>

          </li>

          <li className="nav-item">
            <Link to={"/calendar"} className="nav-link">
              Calendar
            </Link>

          </li>

        </div>
        <div className="navbar-nav ms-auto">
          <li className="nav-item ms-auto" >

            <LoginButton />
            <LogoutButton />

          </li>

        </div>

      </nav>


      <div className="container mt-3">

        <Switch>
          <Route exact path={["/", "/items"]} component={ItemList} />
          <Route exact path={['/map']} component={WorldMap} />
          <Route exact path={['/calendar']} component={Calendar} />

          <Route
            path="/items/:id/edit"
            render={(props) => (
              <AddItem {...props} />
            )}
          />


          <Route
            path="/add-item/"
            render={(props) => (
              <AddItem {...props} />
            )}
          />
          <Route
            path="/items/:id"
            render={(props) => (
              <Item {...props} />
            )}
          />

        </Switch>
      </div>
    </div>
  )
}
export default App;
