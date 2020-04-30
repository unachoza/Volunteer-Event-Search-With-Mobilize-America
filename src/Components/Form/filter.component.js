import React from 'react';

const Filter = ({ children, ...props }) => <button {...props}>{children}</button>;

export default Filter;
