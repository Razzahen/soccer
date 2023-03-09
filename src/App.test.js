import { render, screen } from '@testing-library/react';
import App from './App';

test('renders add player button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/add player/i);
  expect(buttonElement).toBeInTheDocument();
});

