import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@utils/cn";
import type { FunctionComponent } from "preact";

type ContentProps = RdxDropdownMenu.DropdownMenuContentProps &
  Partial<Pick<HTMLElement, "className">>;

type ItemProps = RdxDropdownMenu.DropdownMenuItemProps &
  Partial<Pick<HTMLElement, "className" | "onselect">>;

const DropDownMenuRoot: FunctionComponent = ({ children }) => {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
};

const DropDownMenuTrigger: FunctionComponent = ({ children }) => {
  return (
    <RdxDropdownMenu.Trigger className="outline-none">
      {children}
    </RdxDropdownMenu.Trigger>
  );
};

const DropDownMenuPortal: FunctionComponent = ({ children }) => {
  return <RdxDropdownMenu.Portal>{children}</RdxDropdownMenu.Portal>;
};

const DropDownMenuContent: FunctionComponent<ContentProps> = ({
  children,
  className,
}) => {
  return (
    <RdxDropdownMenu.Content
      className={cn(
        "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
        "data-[side=bottom]:animate-slideUpAndFade",
        "data-[side=top]:animate-slideDownAndFade",
        className,
      )}
    >
      {children}
    </RdxDropdownMenu.Content>
  );
};

const DropDownMenuItem: FunctionComponent<ItemProps> = ({
  children,
  className,
  onselect,
}) => {
  return (
    <RdxDropdownMenu.Item
      onselect={onselect}
      className={cn(
        "min-h-[40px] outline-none flex items-center px-4 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer",
        className,
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
};

export const DropDownMenu = {
  Root: DropDownMenuRoot,
  Trigger: DropDownMenuTrigger,
  Portal: DropDownMenuPortal,
  Content: DropDownMenuContent,
  Item: DropDownMenuItem,
};
