import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const Header = ({
  title,
  description,
  children,
}: HeaderProps) => {

  return (
    <header
      className="
        flex
        items-start
        justify-between
        mb-6
      "
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-[#A5AED8]">
            {description}
          </p>
        )}
      </div>
      {children}
    </header>
  );
};
export default Header;