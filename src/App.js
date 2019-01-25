import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./store";

import Container from "./components/Container";
import Heading from "./components/Heading";
import AppBarContainer from "./containers/AppBarContainer";
import ProjectListContainer from "./containers/ProjectListContainer";

import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="sj-app">
          <Container>
            <Heading className="sj-app__heading">Список проектов</Heading>
            <AppBarContainer className="sj-app__appbar" />
            <ProjectListContainer />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
