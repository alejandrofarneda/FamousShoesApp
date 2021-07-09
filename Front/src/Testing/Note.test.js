// expect(component.container).toHaveTextContent(note.content);true
// const el = component.getByText('This is a test');
// expect(el).toBeDefined();true
// console.log(li); enseña lo que haya en li
// console.log(prettyDom(li)); Para buscar mejor como se renderiza un elemento.

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Note from './Note';

test('renders content', () => {
    const note = {
        content: 'This is a test',
        important: true,
    };

    const component = render(<Note note={note} />);

    component.getByText('This is a test');
    component.getByText('make not important');
});

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'This is a test',
        important: true,
    };

    const mockHandler = jest.fn();

    const component = render(
        <Note note={note} toggleImportance={mockHandler} />
    );

    const button = component.getByText('make not important');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(2); //espera que se hagan 2 veces los clicks y retorna informacion si así no lo fuera
});
