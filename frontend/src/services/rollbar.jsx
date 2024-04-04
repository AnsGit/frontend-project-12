import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'd97da276d1ec42feb195585fb97cf7c9',
  environment: 'testenv',
};

const RollbarProvider = (props = {}) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      {props.children}
    </ErrorBoundary>
  </Provider>
);

export default RollbarProvider;
