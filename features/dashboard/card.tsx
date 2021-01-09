import React from 'react';

export const Card: React.FC<{ title: string; value?: string }> = ({
  title,
  value,
}) => (
  <li
    className="mr-4 mb-4 flex flex-col items-center justify-center p-6 text-center"
    style={{ flex: '1 1 30%' }}
  >
    <p className="text-sm uppercase whitespace-nowrap tracking-wider">
      {title}
    </p>
    <div className="text-3xl font-bold whitespace-nowrap">
      {value ? value : <div>Loading...</div>}
    </div>
  </li>
);

export default Card;
