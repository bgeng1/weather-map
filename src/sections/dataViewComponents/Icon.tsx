import { FC } from "react";

interface IconProps {
  season: string;
}

const Icon: FC<IconProps> = ({ season }) => {
  const icons: Record<string, string> = {
    summer: "sun.png",
    autumn: "maple-leaf.png",
    winter: "snowflake.png",
    spring: "flower.png",
  };

  return (
    <img
      src={`icons/${icons[season]}`}
      alt="seasonal img"
      className="season-icon data-point"
    />
  );
};

export default Icon;
