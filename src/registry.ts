export interface Registry {
  widgets: {
    [key: string]: React.ReactElement;
  };
  fields: {
    [key: string]: React.ReactElement;
  };
}

const registry: Registry = {
  widgets: require('./components/widgets').widgetMap || {},
  fields: require('./components/fields').default || {},
};

export default registry;