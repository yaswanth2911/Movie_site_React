import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails'
import Account from './components/Account'
import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Home Route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Popular Route */}
      <Route
        path="/popular"
        element={
          <ProtectedRoute>
            <Popular />
          </ProtectedRoute>
        }
      />

      {/* Search Route */}
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      {/* Movie Details Route */}
      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        }
      />

      {/* Account Route */}
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />

      {/* Not Found Route */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  </BrowserRouter>
)

export default App