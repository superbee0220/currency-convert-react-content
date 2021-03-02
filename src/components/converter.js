import React from "react";
import { Header } from "semantic-ui-react";
import Fields from "./fields";
import { Grid } from "semantic-ui-react";
import _ from "lodash";

const Converter = () => {

  return (
    <div>
      <Header as="h2">Currency converter</Header>
      <p>Please enter the amount you want to convert in any field.</p>
      <Grid devided="vertically" style={{ padding: "3em 0em" }}>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Fields id="from" />
          </Grid.Column>
          <Grid.Column>
            <Fields id="to" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Converter;
