import { screen, render } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../../OrderEntry";
test("update scoop subtotal when scoop change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

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

test("update toppings subtotal when toppings are checked on/off", async () => {
  const user = userEvent.setup();

  render(<Options optionType="toppings" />);

  //make sure total starts out at 0
  const toppingsSubtotal = await screen.findByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("$0.00");

  //check M&M topping, then check subtotal

  const mmInput = await screen.findByRole("checkbox", { name: "M&Ms" });

  await user.click(mmInput);

  expect(toppingsSubtotal).toHaveTextContent("$1.50");

  //check Hot Fudge topping then check subtotal

  const hotFudgeInput = screen.getByRole("checkbox", {
    name: "Hot fudge",
  });

  await user.click(hotFudgeInput);

  expect(toppingsSubtotal).toHaveTextContent("$3.00");

  //uncheck M&Ms topping then assert on subtotal

  await user.click(mmInput);

  expect(toppingsSubtotal).toHaveTextContent("$1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotalHeading = screen.getByText("Grand total: $", {
      exact: false,
    });
    expect(grandTotalHeading).toHaveTextContent("0.00");
    unmount();
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    //add hot fudge topping then add chocolate scoop
    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    await user.click(hotFudgeCheckbox);
    const chocolateScoopInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateScoopInput);
    await user.type(chocolateScoopInput, "1");
    const grandTotalHeading = screen.getByText("Grand total: $", {
      exact: false,
    });
    expect(grandTotalHeading).toHaveTextContent("3.50");
  });
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    //add mint-chip then add M&Ms topping
    const mintChipInput = await screen.findByRole("spinbutton", {
      name: "Mint chip",
    });

    await user.clear(mintChipInput);
    await user.type(mintChipInput, "2");

    const mnmCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });

    await user.click(mnmCheckbox);

    const grandTotalHeading = screen.getByText("Grand total: $", {
      exact: false,
    });

    expect(grandTotalHeading).toHaveTextContent("5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    //add vanilla scoop and cherries topping, check grand total
    const vanillaScoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaScoopInput);
    await user.type(vanillaScoopInput, "3");

    const cherriesCheckobx = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckobx);

    const grandTotalHeading = screen.getByText("Grand total: $", {
      exact: false,
    });

    expect(grandTotalHeading).toHaveTextContent("7.50");

    //remove vanilla scoop check grand total
    await user.type(vanillaScoopInput, "2");
    expect(grandTotalHeading).toHaveTextContent("5.50");

    //remove cherries topping check grand total
    await user.click(cherriesCheckobx);
    expect(grandTotalHeading).toHaveTextContent("4.00");
  });
});
