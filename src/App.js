import React from 'react';
import data from './assets/map-data.json';
import { MyMap } from './Map';
import './App.css';

function App() {
  return (
    <div className="App">
      <MyMap cities={data} dimensions={[800, 600]}/>
    </div>
  );
}

export default App;


