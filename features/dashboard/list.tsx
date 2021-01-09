import React from 'react';

export type List = React.FC<{
  title: string;
  values?: Array<any>;
  renderValue: (value: any) => React.ReactNode | JSX.Element;
}>;

export const List: List = ({ title, values, renderValue }) => {
  const renderValues = () => values?.map((value) => renderValue(value));

  return (
    <li style={{ flex: '1 1 45%' }} className="mx-4">
      <p
        className="text-sm pb-4 uppercase text-left whitespace-nowrap tracking-wider"
        style={{ flex: '0 0 25%', borderBottom: '1px solid' }}
      >
        {title}
      </p>

      <ul className="ml-auto flex flex-wrap justify-left py-4 text-right">
        {values ? renderValues() : <div>Loading...</div>}
      </ul>
    </li>
  );
};

export default List;
