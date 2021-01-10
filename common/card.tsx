import React from 'react';

export const Card: React.FC<{
  title: React.ReactText;
  value?: string | number;
}> = ({ title, value }) => (
  <li
    className="mr-4 mb-4 flex flex-col items-center justify-center p-6 text-center"
    style={{ flex: '1 1 30%' }}
  >
    <p className="text-sm uppercase whitespace-nowrap tracking-wider">
      {title}
    </p>
    <div className="text-3xl font-bold whitespace-nowrap">
      {typeof value !== 'undefined' ? value : <div>Loading...</div>}
    </div>
  </li>
);

export default Card;
