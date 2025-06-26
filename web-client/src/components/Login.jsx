// src/Login.jsx
import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // On lit notre variable d'env définie en web-client/.env
  const API_BASE = process.env.REACT_APP_API_BASE_URL

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // Utilisation de l'URL complète
      const res = await axios.post(
        `${API_BASE}/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log('token:', res.data.token)
      // … stockez en Postman / LocalStorage / Redux / etc.
    } catch (err) {
      console.error('login failed', err.response || err)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}
