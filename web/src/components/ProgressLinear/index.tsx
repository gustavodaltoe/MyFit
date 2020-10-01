import React, { memo } from 'react';

import './styles.scss';

interface IProps {
  current: number;
  total: number;
}

const ProgressLinear: React.FC<IProps> = memo(({ current, total }: IProps) => {
  const fillWidth = current < total ? (current / total) * 100 : 100;

  return (
    <>
      <div className="bar">
        <div className="fill" style={{ width: `${fillWidth}%` }} />
      </div>
      <p>{`${current < total ? current : 100}/${total} kcal`}</p>
    </>
  );
});

export default ProgressLinear;
