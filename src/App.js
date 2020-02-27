import React from 'react';
import './App.css';
import 'react-quill/dist/quill.snow.css';
import ViewManager from './components/ViewManager.js';
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
