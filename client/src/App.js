import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import PageNotFound from "./pages/PageNotFound"
import { AuthContext } from './helpers/AuthContext' // Context API (like Redux)
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [authState, setAuthState] = useState({ username: '', id: 0, status: false })

  useEffect(() => {
    axios.get('http://localhost:3001/auth/validate', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) setAuthState({ ...authState, status: false })
      else setAuthState({ username: response.data.username, id: response.data.id, status: true })
    })
  }, [authState])

  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({ username: '', id: 0, status: false })
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ) : (
              <>
                <Link to="/createpost">Create A Post</Link>
                <Link to="/">Home Page</Link>
                <button onClick={logout}>Log out</button>
                <button className="left">{authState.username}</button>
              </>
            )
            }
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
