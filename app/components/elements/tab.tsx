import Link from "next/link";
import { clsx } from "clsx";

type TProps = {
  id: string;
  title: string;
  active: boolean;
  onClick: (id: string) => void;
};

export default function Tab({ id, title, active, onClick }: TProps) {
  return (
    <div
      className={clsx(
        "h-full font-HafferXH-Regular text-xs md:text-base lg:text-base px-2 md:px-4 lg:px-4 py-[2px] md:py-[2px] lg:py-[6px] flex justify-center items-center rounded-full overflow-hidden transition-all duration-200 ease-in-out cursor-pointer whitespace-nowrap font-larsseit font-light lg:leading-[28px] md:leading-[28px]",
        {
          "bg-cz-blue-700 text-white": active,
          "text-cz-blue-700": !active,
        }
      )}
      onClick={() => onClick(id)}
    >
      {title}
    </div>
  );
}
