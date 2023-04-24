import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [buttonColor, setButtonColor] = useState('red')
  const [disabled, setDisabled] = useState(false)
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';



  
  return (
    <div>
      <button style={{backgroundColor: buttonColor}}
      onClick = {() => setButtonColor(newButtonColor)}
      disabled={disabled}
      
      >Change to {newButtonColor}</button>
      <input type='checkbox' defaultChecked={disabled} onChange = {(e) => setDisabled(e.target.checked)} id="disabled-button-checkbox"></input>
      <label htmlFor="disabled-button-checkbox">Disable button</label>
    </div>
     

  );
}

export default App;
