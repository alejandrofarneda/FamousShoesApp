import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Togglable from './Togglable';

describe('<Toggable />', () => {
    const buttonLabel = 'show';
    let component;
    //Una manera de renderizar automáticamente el componente sin la necesidad de declararlo en cada test.
    beforeEach(() => {
        component = render(
            <Togglable buttonLabel={buttonLabel}>
                <div>testDivContent</div>
            </Togglable>
        );
    });

    test('renders its children', () => {
        component.getByText('testDivContent');
    });

    //Comprueba que el elemento en Togglable con el style hideWhenVisible tenga como valor del display none
    test('renders its children but they are not visible', () => {
        const el = component.getByText('testDivContent');
        expect(el.parentNode).not.toBeVisible();
    });

    //Clicka el button que cambia la visibilidad del elemento y Comprueba que el mismo NO tenga como valor del display none (que sea visible)
    test('after clicking its children must be shown', () => {
        const button = component.getByText(buttonLabel);
        fireEvent.click(button);

        const el = component.getByText('testDivContent');
        expect(el.parentNode).toBeVisible();
    });
});
