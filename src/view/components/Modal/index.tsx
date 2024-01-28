import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@utils/cn";
import type { FunctionComponent } from "preact";
import { Content } from "./Content";
import { Header, type HeaderProps } from "./Header";

type Props = {
  open: boolean;
};

const ModalRoot: FunctionComponent<Props> = ({ open, children }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/80 backdrop-blur-sm z-50",
            "data-[state=open]:animate-overlayShow",
          )}
        />

        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none",
            "data-[state=open]:animate-contentShow",
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const Modal = {
  Root: ModalRoot,
  Header: Header,
  Content: Content,
};

export type { Props as ModalRootProps, HeaderProps as ModalHeaderProps };
