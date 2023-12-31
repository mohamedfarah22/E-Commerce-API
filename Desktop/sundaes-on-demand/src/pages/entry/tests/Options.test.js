import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";

test("displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(3);

  //confirm alt text of images
  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual([
    "Chocolate scoop",
    "Vanilla scoop",
    "Mint chip scoop",
  ]);
});

test("display image for ech topping from the server", async () => {
  render(<Options optionType="toppings" />);

  //find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  //confirm alt text of topping images
  const altText = toppingImages.map((el) => el.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
