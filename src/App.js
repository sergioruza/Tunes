import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <switch>
          <Route
            exact
            path="/"
            render={ (propsRouter) => (
              <Login { ...propsRouter } />
            ) }
          />

          <Route
            exact
            path="/search"
            render={ (propsRouter) => (
              <Search { ...propsRouter } />
            ) }
          />

          <Route
            exact
            path="/album/:id"
            render={ (propsRouter) => (
              <Album { ...propsRouter } />
            ) }
          />

          <Route
            exact
            path="/favorites"
            render={ (propsRouter) => (
              <Favorites { ...propsRouter } />
            ) }
          />

          <Route
            exact
            path="/profile"
            render={ (propsRouter) => (
              <Profile { ...propsRouter } />
            ) }
          />

          <Route
            exact
            path="/profile/edit"
            render={ (propsRouter) => (
              <ProfileEdit { ...propsRouter } />
            ) }
          />

          <Route exact path="*" component={ NotFound } />
        </switch>
      </BrowserRouter>
    );
  }
}
// ih
export default App;
