import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { logRoles } from '@testing-library/react';
import { replaceCamelCaseWithSpaces } from './App';
test('button has correct inital color, and updates when clicked', () => {
 render(<App/>);
//find an element with a role button and text of 'change to blue'
  const button = screen.getByRole('button', {name:'Change to blue'})
  //expect background color to be red
  expect(button).toHaveStyle('background-color:red')

  //click button
fireEvent.click(button);
//expect to have correct background color after click
expect(button).toHaveStyle('background-color:blue')

//expect text to be "Change to red"
expect(button).toHaveTextContent('Change to red')
});

test('initial conditions', () =>{
  render(<App/>)
  //check that the button starts out enable
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkBox = screen.getByRole('checkbox')
  expect(checkBox).not.toBeChecked()

  
})

test('button disabled functionality', () =>{
  render(<App/>)
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkBox = screen.getByRole('checkbox', {name: 'Disable button'})
  //check that checkbox is checked when clicked and that button is disabled
  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked()
  expect(colorButton).toBeDisabled()
 

  //check that checkbox is disabled when clicked again and that button is enabled
  fireEvent.click(checkBox);
  expect(checkBox).not.toBeChecked()
  expect(colorButton).toBeEnabled()
  

})

test('disabled button has grey background reverts to red', () =>{
  render(<App/>)
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkBox = screen.getByRole('checkbox', {name: 'Disable button'})
  //click checkbox to disable button, button is gray
  fireEvent.click(checkBox)
  expect(colorButton).toHaveStyle('background-color: gray')
  //click checkbox to disable button, button is red
  fireEvent.click(checkBox)
  expect(colorButton).toHaveStyle('backgroundColor: red')


})

test('clicked button disabled has gray background then reverts to blue', () =>{
  render(<App/>)
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkBox = screen.getByRole('checkbox', {name: 'Disable button'})

  //first click button then make sure button background color is blue
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle('background-color: blue');

  //then click checkbox and make sure that button background is gray
  fireEvent.click(checkBox)
  expect(colorButton).toHaveStyle('background-color: gray');

  //then click checkbox again and color should revert back to blue
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle('background-color: blue')
})

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('Red')).toBe('Red');
  })
  test('Works for one inner capital letter', () =>{
    expect(replaceCamelCaseWithSpaces('MidnightBlue')).toBe('Midnight Blue')


  })
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')

  })
})