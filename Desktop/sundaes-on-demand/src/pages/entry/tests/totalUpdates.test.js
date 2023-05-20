import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../Context/OrderDetails";
test("update scoop subtotal when scoop change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  //make sure total starts out at $0.00
  const scoopsSubtotal = await screen.findByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  // update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.0");
  //update chocolate scoops to 2, and check subtotal
  const chocolateScoops = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateScoops);
  await user.type(chocolateScoops, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
