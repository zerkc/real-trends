import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Lista de Tareas', () => {
  render(<App />);
  const linkElement = screen.getByText(/Lista de Tareas/i);
  expect(linkElement).toBeInTheDocument();
});
