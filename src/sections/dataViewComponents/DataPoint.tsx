import { FC, ReactNode } from "react";

interface DataPointProps {
  label: string;
  value: ReactNode;
}

const DataPoint: FC<DataPointProps> = ({ label, value }) => {
  return (
    <div className="data-point">
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
};

export default DataPoint;
