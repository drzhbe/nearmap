import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MyMap } from './Map';

describe('MyMap', () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Does not render markers when empty cities array is passed', () => {
    render(<MyMap cities={[]} dimensions={[100, 50]}/>, container);
    expect(container.querySelectorAll('.marker').length).toEqual(0);
  });

  it('Renders markers for each valid city passed', () => {
    const cities = [
      {position: [-1, 0]}, // invalid
      {position: [0, 0]},
      {position: [50, 25]},
      {position: [100, 50]},
      {position: [100, 51]}, // invalid
    ];
    render(<MyMap cities={cities} dimensions={[100, 50]}/>, container);
    expect(container.querySelectorAll('.marker').length).toEqual(3);
  });

  it('Click on the marker opens popup', () => {
    const cities = [
      {position: [50, 25], name: 'Sydney'},
    ];
    let popup;

    act(() => {
      render(<MyMap cities={cities} dimensions={[100, 50]}/>, container)
    });
    const [m1] = container.querySelectorAll('.marker');
    popup = container.querySelector('.popup');
    expect(popup).toBe(null);

    act(() => {
      m1.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    popup = container.querySelector('.popup');
    expect(popup).toBeTruthy();

    const name = popup.querySelector('h1').textContent;
    expect(name).toEqual('Sydney');
  });

  it('Click on the same marker closes popup', () => {
    const cities = [
      {position: [50, 25]},
    ];
    let popup;

    act(() => {
      render(<MyMap cities={cities} dimensions={[100, 50]}/>, container)
    });
    const [m1] = container.querySelectorAll('.marker');

    // Click a marker
    act(() => {
      m1.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    popup = container.querySelector('.popup');
    expect(popup).toBeTruthy();

    // Click the same marker
    act(() => {
      m1.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    popup = container.querySelector('.popup');
    expect(popup).toBeFalsy();
  });

  it('Click on the different marker replaces popup', () => {
    const cities = [
      {position: [50, 25], name: 'Sydney'},
      {position: [100, 50], name: 'Berlin'},
    ];
    let popup;
    let name;

    act(() => {
      render(<MyMap cities={cities} dimensions={[100, 50]}/>, container)
    });
    const [m1, m2] = container.querySelectorAll('.marker');

    // Click a marker
    act(() => {
      m1.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    popup = container.querySelector('.popup');
    expect(popup).toBeTruthy();

    name = popup.querySelector('h1').textContent;
    expect(name).toEqual('Sydney');

    // Click another marker
    act(() => {
      m2.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    popup = container.querySelector('.popup');
    expect(popup).toBeTruthy();

    name = popup.querySelector('h1').textContent;
    expect(name).toEqual('Berlin');
  });

  it('Click on the map closes popup', () => {
    const cities = [
      {position: [50, 25]},
    ];
    let popup;

    act(() => {
      render(<MyMap cities={cities} dimensions={[100, 50]}/>, container)
    });
    const [m1] = container.querySelectorAll('.marker');

    // Click a marker
    act(() => {
      m1.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    popup = container.querySelector('.popup');
    expect(popup).toBeTruthy();

    // Click a map
    const map = container.querySelector('.map');
    act(() => {
      map.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    popup = container.querySelector('.popup');
    expect(popup).toBeFalsy();
  });
});
