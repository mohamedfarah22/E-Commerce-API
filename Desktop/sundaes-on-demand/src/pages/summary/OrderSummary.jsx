import React from "react";

import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../Context/OrderDetails";
import { formatCurrency } from "../../utilites";
export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); //[ ["chocolate", 2],["vanilla", 2],];

  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Object.keys(optionCounts.toppings);

  const toppingList = toppingArray.map((topping) => (
    <li key={topping}>{topping}</li>
  ));
  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)} </h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </div>
  );
}
