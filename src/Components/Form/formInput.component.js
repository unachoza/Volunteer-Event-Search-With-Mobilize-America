import React from 'react';

const FormInput = ({ children, ...props }) => <input {...props}>{children}</input>;

export default FormInput;
