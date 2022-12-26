import { FC } from "react";

export type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

const CheckBox: FC<{ setState: SetBooleanState }> = ({ setState }) => (
  <input
    type="checkbox"
    onChange={(e) => {
      if (e.target.checked) {
        setState(true);
      } else {
        setState(false);
      }
    }}
  />
);

export default CheckBox;
