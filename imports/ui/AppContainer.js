import React from 'react';
import { isAPIModule } from '../api/apiModuleCommon';
import { App } from './App';

export const AppContainer = () => {
  if (isAPIModule()) {
    return <div>This is the API</div>;
  }
  return <App />;
};
