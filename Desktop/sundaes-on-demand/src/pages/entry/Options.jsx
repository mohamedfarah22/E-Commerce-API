import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOptions";
import Row from "react-bootstrap/Row";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/alertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilites";
import { useOrderDetails } from "../../Context/OrderDetails";
export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();
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
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>;
    </>
  );
}
