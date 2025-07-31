

/* eslint-disable no-undef */
/* eslint-env jest */
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import { Navbar, HeroSection } from '../LandingPage';

describe('LandingPage', () => {
  it('renders Navbar without crashing', () => {
    renderWithProviders(<Navbar />);
  });
  it('renders HeroSection without crashing', () => {
    renderWithProviders(<HeroSection />);
  });
});
