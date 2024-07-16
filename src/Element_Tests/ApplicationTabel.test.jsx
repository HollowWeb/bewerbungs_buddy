import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import ApplicationsTable from '../Elements/ApplicationsTable';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';

afterEach(cleanup); // Ensure that tests clean up after themselves

test("ApplicationsTable renders correctly", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <ApplicationsTable />
      </MemoryRouter>
    );
  });

  expect(screen.getByText("Kanton")).toBeInTheDocument();
  expect(screen.getByText("Date")).toBeInTheDocument();
});

test("ApplicationTable Sort by Date updates Arrow", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <ApplicationsTable />
      </MemoryRouter>
    );
  });

  expect(screen.getByText("Sort by Date ↓")).toBeInTheDocument();

  const button = screen.getByText("Sort by Date ↓");
  
  await act(async () => {
    fireEvent.click(button);
  });

  expect(screen.getByText("Sort by Date ↑")).toBeInTheDocument();
});
