import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

const Header = () => {
  const [activeItem, setActive] = useState("converter");

  const handleItemCLick = (e, { name }) => {
    setActive(name);
  };

  return (
    <Menu>
      <Container>
      <Menu.Item
        name="converter"
        active={activeItem === "converter"}
        onClick={handleItemCLick}
        as={Link}
        to="/"
      >
        CURRENCY CONVERTER
      </Menu.Item>
      <Menu.Item
        name="exchange"
        active={activeItem === "exchange"}
        onClick={handleItemCLick}
        as={Link}
        to="/exchange"
      >
        CURRENT EXCHANGE RATES
      </Menu.Item>
      </Container>
      
    </Menu>
  );
};

export default Header;
