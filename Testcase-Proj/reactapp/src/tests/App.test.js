import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders Task Management title', () => {
  render(<App />);
  expect(screen.getByText('Task Management')).toBeInTheDocument();
});

test('renders navigation buttons', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Task List' })).toBeInTheDocument();
});

test('shows default tasks on load', () => {
  render(<App />);
  expect(screen.getByText('Task One - pending')).toBeInTheDocument();
  expect(screen.getByText('Task Two - completed')).toBeInTheDocument();
});

test('shows Add Task form when button clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
  expect(screen.getByPlaceholderText('Task Name')).toBeInTheDocument();
});

test('shows task form inputs', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
  expect(screen.getByPlaceholderText('Task Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
});

test('can fill task form', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
  fireEvent.change(screen.getByPlaceholderText('Task Name'), { target: { value: 'New Task' } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
  expect(screen.getByDisplayValue('New Task')).toBeInTheDocument();
  expect(screen.getByDisplayValue('New Description')).toBeInTheDocument();
});

test('shows View Details buttons for tasks', () => {
  render(<App />);
  expect(screen.getAllByText('View Details')).toHaveLength(2);
});

test('shows task details when clicked', () => {
  render(<App />);
  fireEvent.click(screen.getAllByText('View Details')[0]);
  expect(screen.getByText('Task Details')).toBeInTheDocument();
  expect(screen.getByText(/Name:/)).toBeInTheDocument();
});

test('shows status buttons in details', () => {
  render(<App />);
  fireEvent.click(screen.getAllByText('View Details')[0]);
  expect(screen.getByText('Pending')).toBeInTheDocument();
  expect(screen.getByText('In Progress')).toBeInTheDocument();
  expect(screen.getByText('Completed')).toBeInTheDocument();
});

test('can update task status', () => {
  render(<App />);
  fireEvent.click(screen.getAllByText('View Details')[0]);
  fireEvent.click(screen.getByText('Completed'));
  expect(screen.getByText('Current: completed')).toBeInTheDocument();
});