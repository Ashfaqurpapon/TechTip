/* eslint-disable prettier/prettier */
"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { MoonFilledIcon, SunFilledIcon } from "@/src/assets/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const { isSelected, getBaseProps, getInputProps, getWrapperProps } =
    useSwitch({
      isSelected: theme === "light" || isSSR,
      "aria-label": `Switch to ${
        theme === "light" || isSSR ? "dark" : "light"
      } mode`,
      onChange,
    });

  return (
    <div
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={clsx(
          "w-auto h-auto bg-transparent rounded-lg flex items-center justify-center !text-default-500",
          classNames?.wrapper
        )}
      >
        {!isSelected || isSSR ? (
          <SunFilledIcon size={22} />
        ) : (
          <MoonFilledIcon size={22} />
        )}
      </div>
    </div>
  );
};
