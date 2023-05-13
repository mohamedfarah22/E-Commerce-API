import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOptions";
import Row from "react-bootstrap/Row";
export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios
      .get(`https://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO : handle error response
      });
  }, [optionType]);

  //TODO: replace 'null' with toppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <Row>{optionItems}</Row>;
}
