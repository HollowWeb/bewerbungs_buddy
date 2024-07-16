// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import Modal from 'react-modal';

// Set up a root element for react-modal
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

Modal.setAppElement('#root');

