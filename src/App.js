import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hangman from './components/hangman';
function App() {
  return (
    <div className="App" style={{backgroundColor: '#7fe0ad'}}>
      <Hangman/>
    </div>
  );
}
export default App;
