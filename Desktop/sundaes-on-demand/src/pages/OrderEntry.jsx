import Options from "./entry/Options";
import { useOrderDetails } from "../Context/OrderDetails";
import { formatCurrency } from "../utilites";
export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const grandTotal = totals.scoops + totals.toppings;

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>
    </div>
  );
}
