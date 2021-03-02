import React, { useState, useEffect} from "react";
import _ from "lodash";

import currencyApi from "../apis/currencyApi";
import currencyLiveApi from '../apis/currencyLiveApi';

const CurrencyContext = React.createContext();
const RateContext = React.createContext();
const DropdownContext = React.createContext();
const InputContext = React.createContext();
const LoadingContext = React.createContext();

const CurrencyContextProvider = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [quotes, setQuotes] = useState(null);
  const [countries, setCountries] = useState(null);
  const [rate, setRate] = useState(null);
  const [currency, setCurrency] = useState({ from: "USD", to: "EUR" });
  const [debouncedCurrency, setDebouncedCurrency] = useState(currency);
  const [amounts, setAmounts] = useState({ from: 1, to: 0 });
  const [isloading, setloading] = useState(true);

  useEffect(() => {
    currencyApi
      .get("/currencies")
      .then(function (res) {
        setCurrencies(res.data.results);
      })
      .catch(function (err) {
        console.log(err);
      });

      fetctList();
  }, []);

  const fetctList = async() =>{
    const resList = await currencyLiveApi.get("/list");
    var _countries = [];
    for (var key in resList.data.currencies){
      _countries.push({id : key, name: resList.data.currencies[key]});
    }
    setCountries(_countries);
    const resLive = await currencyLiveApi.get("/live");
    setQuotes(resLive.data.quotes);
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedCurrency(currency);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [currency]);

  useEffect(() => {
    fetchRate(currency.from, currency.to);
  }, [debouncedCurrency]);

  const fetchRate = async (fromCurrency, toCurrency) => {
    const from = `${fromCurrency}_${toCurrency}`;
    const to = `${toCurrency}_${fromCurrency}`;
    if (from === to) {
      setRate({ [fromCurrency]: 1, [toCurrency]: 1 });
    } else {
      const { data } = await currencyApi.get("/convert", {
        params: { q: `${from},${to}`, compact: "ultra" },
      });
      setRate({ [fromCurrency]: data[`${from}`], [toCurrency]: data[`${to}`] });
    }
  };

  return (
    <CurrencyContext.Provider value={[currencies, countries, quotes]}>
      <RateContext.Provider value={[rate, fetchRate]}>
        <DropdownContext.Provider value={[currency, setCurrency]}>
          <InputContext.Provider value={[amounts, setAmounts]}>
            <LoadingContext.Provider value={[isloading, setloading]}>
              {props.children}
            </LoadingContext.Provider>
          </InputContext.Provider>
        </DropdownContext.Provider>
      </RateContext.Provider>
    </CurrencyContext.Provider>
  );
};

export {
  CurrencyContext,
  RateContext,
  DropdownContext,
  InputContext,
  LoadingContext,
  CurrencyContextProvider,
};
