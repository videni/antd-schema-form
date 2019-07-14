import React from 'react';

export function getWidget(widget: string, registeredWidgets: object): React.ReactElement {
  if (!registeredWidgets.hasOwnProperty(widget)) {
    throw new Error(`Widget "${widget} is not registered", please register it first`);
  }

  return registeredWidgets[widget];
}