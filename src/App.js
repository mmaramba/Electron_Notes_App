import React from 'react';
import './App.css';
import 'react-quill/dist/quill.snow.css';
import ViewManager from './components/ViewManager.js';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from './configureStore.js';

const store = configureStore();

const CenteredDiv = styled.div`
  text-align: center;
`

function App() {
  return (
    <CenteredDiv>
      <Provider store={store}>
        <ViewManager />
      </Provider>
    </CenteredDiv>
  );
}

export default App;
