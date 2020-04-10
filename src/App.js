import React from 'react';
import './App.css';
import Map from './components/map';

function App() {

  return (
    <div className="App">
      <h1>The UWI Cave Hill</h1>
      <div className={'map'}>
        <Map />        
      </div>
    </div>
  );
}

export default App;
