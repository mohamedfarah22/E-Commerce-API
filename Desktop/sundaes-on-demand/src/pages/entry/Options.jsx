import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOptions";
import Row from "react-bootstrap/Row";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/alertBanner";
export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios
      .get(`https://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO : handle error response
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  //TODO: replace 'null' with toppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <Row>{optionItems}</Row>;
}
