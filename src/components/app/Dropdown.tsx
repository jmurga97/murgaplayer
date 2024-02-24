import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
import { ReactNode } from "react";

interface Props {
  name: string | null;
  email: string | null;
  children: ReactNode;
}

const Dropdown = ({ name, email, children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white uppercase tracking-wider font-thin flex flex-row gap-1">
        {name} <IoMdArrowDropdown size="1.5rem" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
