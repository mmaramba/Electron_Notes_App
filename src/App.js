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
import styled from 'styled-components';

const CenteredDiv = styled.div`
  text-align: center;
`

function App() {
  return (
    <CenteredDiv>
      <ViewManager />
    </CenteredDiv>
  );
}

export default App;
