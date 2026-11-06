interface InfoCardProps {
  title: string;
  value: string | number;
  color?: "green" | "orange" | "cyan" | "red";
}

const Card = ({
  title,
  value,
  color = "green",
}: InfoCardProps) => {

  const colors = {
    green: "border-l-green-500",
    orange: "border-l-orange-600",
    cyan: "border-l-cyan-500",
    red: "border-l-red-600",
  };

  return (
    <div
      className={`
        w-40
        min-h-24
        bg-[#2A2E42]
        border
        border-[#3A4059]
        border-l-4
        ${colors[color]}
        rounded-lg
        p-3
        flex
        flex-col
        gap-1
      `}
    >
      <span className="text-2xl font-bold text-white">
        {value}
      </span>

      <span className="text-lg text-[#A5AED8]">
        {title}
      </span>
    </div>
  );
};

export default Card;