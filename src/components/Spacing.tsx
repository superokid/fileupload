import React from 'react';

interface Props {
  size: string;
}

const Spacing = ({ size }: Props) => {
  return <div style={{ height: size }}></div>;
};

export default Spacing;
