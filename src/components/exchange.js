import { useContext, useEffect } from "react";
import { Header, Table } from "semantic-ui-react";
import { CurrencyContext } from "./currencyContext";
import _ from "lodash";

import currencyApi from "../apis/currencyApi";

const Exchange = () => {
  const [, countries, quotes] = useContext(CurrencyContext);
  
  const arrayCurrencies = _.values(
    _.filter(countries, function (c) {
      return c.id !== "USD";
    })
  );
  const renderRow = _.map(arrayCurrencies, ({id, name }, index) => (
    <Table.Row key={id}>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{quotes[`USD${id}`]}</Table.Cell>
    </Table.Row>
  ));

  return (
    <div>
      <Header as="h2">US Dollar (USD) Exchange Rates</Header>
      <Table singleLine={false}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Currency</Table.HeaderCell>
            <Table.HeaderCell>Currency Name</Table.HeaderCell>
            <Table.HeaderCell>Exchange Rate = 1 USD</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body children={renderRow} />
      </Table>
    </div>
  );
};

export default Exchange;
