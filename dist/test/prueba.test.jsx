import { render, cleanup, screen } from '@testing-library/react';
import { Button, NotesButton, StatusButton } from '../components/Button';
afterEach(cleanup);
describe('Button', () => {
    afterEach(cleanup);
    test('renders with background color red for delete', () => {
        render(<Button type="delete"/>);
        expect(screen.getByRole('button')).toHaveStyle(`
        background-color: rgb(226, 52, 40);
      `);
    });
    test('renders with background color green the other cases', () => {
        render(<Button />);
        expect(screen.getByRole('button')).toHaveStyle(`
          background-color: rgb(19, 88, 70);
        `);
    });
});
describe('NotesButton', () => {
    afterEach(cleanup);
    test('renders with background color white, border green and color green for empty', () => {
        render(<NotesButton empty/>);
        expect(screen.getByRole('button')).toHaveStyle(`
      background-color: rgb(255, 255, 255);
      border: 1px solid #799283;
      color: #799283;
      `);
    });
    test('renders with background color green the other cases', () => {
        render(<NotesButton />);
        expect(screen.getByRole('button')).toHaveStyle(`
          background-color: rgb(238, 249, 242);
          border: none;
          color: #212121;
        `);
    });
});
describe('StatusButton', () => {
    afterEach(cleanup);
    test('renders with green colors for CHECK IN', () => {
        render(<StatusButton status="CHECK IN"/>);
        expect(screen.getByRole('button')).toHaveStyle(`
      color: rgb(90, 208, 122);
      background-color: rgb(232, 255, 238);
      `);
    });
    test('renders with red colors for CHECK OUT', () => {
        render(<StatusButton status="CHECK OUT"/>);
        expect(screen.getByRole('button')).toHaveStyle(`
      color: #E23428;
      background-color: #FFEDEC;
      `);
    });
    test('renders with yellow colors for IN PROGRESS', () => {
        render(<StatusButton status="IN PROGRESS"/>);
        expect(screen.getByRole('button')).toHaveStyle(`
      color: #ebd90d;
      background-color: #fffeeb;
      `);
    });
});
