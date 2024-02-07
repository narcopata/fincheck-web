import * as RdxPopover from "@radix-ui/react-popover";
import { cn } from "@utils/cn";
import type { FunctionComponent } from "preact";

type ContentProps = RdxPopover.PopoverContentProps & Partial<HTMLDivElement>;

const Root: FunctionComponent<RdxPopover.PopoverProps> = ({ children }) => {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
};

const Trigger: FunctionComponent<
  RdxPopover.PopoverTriggerProps & {
    asChild?: boolean;
  }
> = ({ children, ...props }) => {
  return <RdxPopover.Trigger {...props}>{children}</RdxPopover.Trigger>;
};

const Content: FunctionComponent<ContentProps> = ({ children, className }) => {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          "rounded-2xl p-4 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]",
          "data-[side=bottom]:animate-slideUpAndFade",
          "data-[side=top]:animate-slideDownAndFade",
          className,
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
};

export const Popover = {
  Root,
  Content,
  Trigger,
};
