import { Cross1Icon } from "@assets/icons/radix-icons";
import type { ComponentChildren, FunctionComponent } from "preact";
import { useCallback } from "preact/hooks";

type BaseProps = {
  title: string;
  onClose?: () => unknown;
  rightAction?: ComponentChildren;
};

type Props = BaseProps & {
  children?: FunctionComponent<BaseProps> | ComponentChildren;
};

export const Header: FunctionComponent<Props> = ({
  children,
  onClose: onCloseFromChild,
  ...props
}) => {
  const onClose = useCallback(() => {
    if (onCloseFromChild) {
      onCloseFromChild();
    }
  }, [onCloseFromChild]);

  return (
    <header className="h-12 flex items-center justify-between text-gray-800">
      {typeof children === "function" ? (
        children({ onClose, ...props })
      ) : (
        <>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center outline-none"
            onClick={onClose}
          >
            <Cross1Icon className="" />
          </button>
          <span className="text-lg tracking-[-1px] font-bold">
            {props.title}
          </span>
          <div className="w-12 h-12 flex items-center justify-center">RA</div>
        </>
      )}
    </header>
  );
};

export { BaseProps as HeaderProps };
