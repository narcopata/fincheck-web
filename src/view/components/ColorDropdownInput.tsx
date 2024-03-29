import { ChevronDownIcon } from "@assets/icons/radix-icons";
import { COLORS, type ColorKey, type ColorValue } from "@constants/colors";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@utils/cn";
import type { ComponentProps, FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { ColorIcon } from "../pages/Dashboard/components/icons/ColorIcon";
import { DropDownMenu } from "./DropdownMenu";

type Props = Partial<ComponentProps<"select">> & {
  errorMessage?: string;
  onInput?: (color: ColorKey) => void;
  value?: ColorKey | "";
};

export const ColorDropdownInput: FunctionComponent<Props> = ({
  errorMessage,
  className,
  onInput,
  value,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorKey | null>(
    value || null,
  );

  const handleSelect = useCallback(
    (color: ColorKey) => {
      setSelectedColor(color);
      onInput?.(color);
    },
    [onInput],
  );

  return (
    <form>
      <DropDownMenu.Root>
        <DropDownMenu.Trigger asChild>
          <button
            className={cn(
              "bg-white rounded-lg border border-gray-500 focus:border-gray-800 text-gray-700 w-full h-[52px] px-3 outline-none transition-all text-left relative",
              {
                "!border-red-900": !!errorMessage,
              },
              className,
            )}
            type="button"
          >
            Cor
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {!selectedColor && (
                <ChevronDownIcon className="w-6 h-6 text-gray-800" />
              )}
              {selectedColor && <ColorIcon {...COLORS[selectedColor]} />}
            </div>
          </button>
        </DropDownMenu.Trigger>

        <DropDownMenu.Content className="grid grid-cols-4">
          {(Object.entries(COLORS) as [ColorKey, ColorValue][]).map(
            ([key, color]) => (
              <DropDownMenu.Item
                onselect={() => handleSelect(key)}
                key={color.color}
              >
                <ColorIcon {...color} />
              </DropDownMenu.Item>
            ),
          )}
        </DropDownMenu.Content>
      </DropDownMenu.Root>

      {errorMessage && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{errorMessage}</span>
        </div>
      )}
    </form>
  );
};
