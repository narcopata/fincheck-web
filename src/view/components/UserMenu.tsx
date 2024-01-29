import { ExitIcon } from "@assets/icons/radix-icons";
import { useAuthContext } from "../../app/contexts/AuthContext";
import { DropDownMenu } from "./DropdownMenu";

export const UserMenu = () => {
  const { signout } = useAuthContext();

  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger>
        <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100">
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
            RS
          </span>
        </div>
      </DropDownMenu.Trigger>

      <DropDownMenu.Content className="w-32">
        <DropDownMenu.Item
          onselect={signout}
          className="flex items-center justify-between"
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropDownMenu.Item>
      </DropDownMenu.Content>
    </DropDownMenu.Root>
  );
};
