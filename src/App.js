import React from 'react';
import './App.css';
import 'react-quill/dist/quill.snow.css';
import ViewManager from './components/ViewManager.js';
import {
  HashRouter,
  Route,
  Link,
  Switch
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ViewManager />
    </div>
  );
}

export default App;
