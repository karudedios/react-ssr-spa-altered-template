import React from 'react';

import { expect } from 'chai';
import { StaticRouter } from 'react-router';

import AboutPage from '../../../../../../src/app/pages/about_page/about_page';
import Enzyme from '../../../../utils/enzyme_adapter_util';

const { shallow } = Enzyme;

describe('A suite for about page', function() {
  it('renders without error', function() {
    expect(
      shallow(
        <StaticRouter context={{}}>
          <AboutPage />
        </StaticRouter>
      ).dive().length
    ).to.equal(1);
  });
});
