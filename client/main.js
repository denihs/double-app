import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { AppContainer } from '../imports/ui/AppContainer';

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('root'));
});
