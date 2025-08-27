import React from 'react';
import { Riple } from 'react-loading-indicators';

export default function Loader({ text = '' }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '40vh'
    }}>
      <Riple color="#32cd32" size="medium" text={text} textColor="" />
    </div>
  );
}


