import React from 'react';
import PropTypes from 'prop-types';
import { Schema } from '../../types';

function UnsupportedField(props: { schema: Schema; $id: string; reason: string }) {
  const { schema, $id, reason } = props;

  return (
    <div className="unsupported-field">
      <p>
        Unsupported field schema
        {$id && $id && (
          <span>
            {' for'} field <code>{$id}</code>
          </span>
        )}
        {reason && <em>: {reason}</em>}.
      </p>
      {schema && <pre>{JSON.stringify(schema, null, 2)}</pre>}
    </div>
  );
}

UnsupportedField.propTypes = {
  schema: PropTypes.object.isRequired,
  $id: PropTypes.object,
  reason: PropTypes.string
};

export default UnsupportedField;