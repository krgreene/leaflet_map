import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {

  test('renders the map title on the page', () => {
    const { getByText } = render(<App />);
    expect(getByText(/The UWI Cave Hill/g)).toBeInTheDocument();
  });

  test('renders the map component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('map-div')).toBeInTheDocument();
  });

  test('renders map attribution', () => {
    const { getByText } = render(<App />);
    expect(getByText(/OpenStreetMap/g)).toBeInTheDocument();
  });

  test('displays latlng when the map is clicked', () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click(getByTestId('map-div'));
    expect(getByText(/^LatLng\(13.[\d]*, -59.[\d]*\)$/g)).toBeInTheDocument();
    // regex exact quantifiers {6} do not work
  });

});