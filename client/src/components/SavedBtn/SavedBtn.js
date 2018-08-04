import React from 'react';

const Panel = (props) => (
  <div className="panel panel-primary" {...props}>
    {props.children}
  </div>
);

export default Panel;