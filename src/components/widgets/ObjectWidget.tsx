import * as React from 'react';
import { Collapse } from 'antd';
import styleName from '../../utils/styleName';

function ObjectWidget(props: {
  id: string;
  header: React.ReactNodeArray;
  propertyFields: React.ReactNodeArray;
}): React.ReactElement {
  const { id, header, propertyFields } = props;

  return (
    <Collapse key={ id } className={ styleName('object-collapse') } defaultActiveKey={ [id] }>
      <Collapse.Panel key={ id } header={ header }>
        { propertyFields }
      </Collapse.Panel>
    </Collapse>);
}

export default ObjectWidget;