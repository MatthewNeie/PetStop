import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
        <h1>Boilerplate</h1>
        <img id='comp-img' src='./computer.png'></img>
        <p>CAPSTONE</p>
        <Login />
    </div>
  );
}

export default App;
