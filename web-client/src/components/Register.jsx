import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email,password] = useState({email:'',password:''});
  const nav = useNavigate();

  const handle = async e => {
    e.preventDefault();
    await api.post('/auth/register', email).then(()=>nav('/login'));
  };

  return (
    <form onSubmit={handle}>
      <h2>Inscription</h2>
      <input type="email"   placeholder="Email"   onChange={e=>email({ ...email, email: e.target.value })} />
      <input type="password"placeholder="Mot de passe" onChange={e=>email({ ...email, password: e.target.value })} />
      <button>Register</button>
    </form>
  );
}
