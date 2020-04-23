import React from 'react';
import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';

const override = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
`;

const LoadingSpinner = ({loading}) => (
  <div className="sweet-loading">
  <PulseLoader css={override} sizeUnit={'px'} size={15} margin={6} color={'#004ac7'} loading={loading} />
  </div>
)

export default LoadingSpinner;
