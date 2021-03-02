import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Converter from "./converter";
import Exchange from "./exchange";
import Header from "./header";

import { CurrencyContextProvider } from "./currencyContext";

const App = () => {
  return (
    <CurrencyContextProvider>
      <Router>
        <Header />
        <Container style={{ padding: "5em 0em" }}>
          <Switch>
            <Route exact path="/" component={Converter} />
            <Route exact path="/exchange" component={Exchange} />
          </Switch>
        </Container>
      </Router>
    </CurrencyContextProvider>
  );
};

export default App;
