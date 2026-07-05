'use client'; 
import {useState} from 'react';

import style from './page.module.css';


interface User {
  username: string;
  password: string;
}



const users: User[] = [
  { username: 'admin', password: 'admin' },
  { username: 'profesor', password: 'profesor' },
  { username: 'estudiante', password: 'estudiante' }
]; 

export default function Home() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {

    if (username === '' || password === '') {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (users.some(user => user.username === username && user.password === password)) {
      setError('');
      alert('Inicio de sesión exitoso');
    } else {  
      setError('Usuario o contraseña incorrectos.');
     }

  }


  return (
    <main className={style.main}>
      <h1>Guía 2: Login</h1>
    <div className={style.form}>
      <input
        type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
      <input
        type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button onClick={handleLogin}>Iniciar sesión</button>
      {error && <p className={style.error}>{error}</p>}
    </div>
    
    </main>
  );
 } 