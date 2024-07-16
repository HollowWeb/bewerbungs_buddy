import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../Elements/App.js';

test('renders home page', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    // Assuming there is some text or element that uniquely identifies the home page
    expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
});

test('renders error page for invalid URL', () => {
    render(
        <MemoryRouter initialEntries={['/invalid-url']}>
            <App />
        </MemoryRouter>
    );

    // Assuming there is some text or element that uniquely identifies the error page
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
});

test('renders new application page', () => {
    render(
        <MemoryRouter initialEntries={['/new_application']}>
            <App />
        </MemoryRouter>
    );

    // Assuming there is some text or element that uniquely identifies the new application page
    expect(screen.getByText(/ADD A NEW APPLICATION/i)).toBeInTheDocument();
});
