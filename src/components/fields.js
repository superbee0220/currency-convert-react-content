import React, { useEffect } from "react";
import { useContext } from "react";
import { Dropdown, Form, Label, Input } from "semantic-ui-react";
import _ from "lodash";

import {
  CurrencyContext,
  RateContext,
  DropdownContext,
  InputContext,
  LoadingContext,
} from "./currencyContext";

const Fields = ({ id }) => {
  const [currencies] = useContext(CurrencyContext);
  const [rate] = useContext(RateContext);
  const [currency, setCurrency] = useContext(DropdownContext);
  const [amounts, setAmounts] = useContext(InputContext);
  const [isloading, setloading] = useContext(LoadingContext);
  useEffect(() => {
    if (rate && currency) {
      const exchange_rate = rate[currency["from"]];
      setAmounts({
        ...amounts,
        to: Number((amounts.from * exchange_rate).toFixed(2)),
      });
    }

    setloading(false);
  }, [rate]);

  const currencyOptions = _.map(
    _.values(currencies),
    ({ currencyName, id }, index) => ({
      key: id,
      text: `${currencyName} (${id})`,
      value: id,
    })
  );

  const onChangeValue = (event, data) => {
    setCurrency({ ...currency, [id]: data.value });
    setloading(true);
  };

  const onChangeInput = (event) => {
    const value = event.target.value;
    let newAmounts = {};
    if (id === "from") {
      newAmounts = {
        from: value,
        to: Number((value * rate[currency["from"]]).toFixed(2)),
      };
    } else {
      newAmounts = {
        from: Number((value * rate[currency["to"]]).toFixed(2)),
        to: value,
      };
    }

    setAmounts(newAmounts);
  };

  if (currencies && currency && rate) {
    const symbol = currencies[currency[id]].currencySymbol;
    return (
      <div>
        <Form className="fidels-container">
          <Form.Field>
            <Label basic>Currency</Label>
            <Dropdown
              fluid
              search
              selection
              defaultValue={currency[id]}
              options={currencyOptions}
              onChange={onChangeValue}
            />
          </Form.Field>
          <Form.Field className="amount">
            <Label basic>Enter amount</Label>
            <Input
              type="number"
              value={amounts[id] ? amounts[id] : 0}
              onChange={onChangeInput}
              loading={isloading}
              disabled={isloading}
              label={
                !isloading && symbol && { basic: true, content: `${symbol}` }
              }
              labelPosition="right"
            />
          </Form.Field>
        </Form>
        <p className="desc">
          {id === "from"
            ? `1 ${currency.from} = ${rate[currency.from]} ${currency.to}`
            : `1 ${currency.to} = ${rate[currency.to]} ${currency.from}`}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default Fields;
