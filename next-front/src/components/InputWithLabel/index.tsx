import { Box, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

export interface InputWithLabelProps {
  label: string;
  placeholder?: string;
  name?: string;
  ref?: React.RefObject<HTMLInputElement>;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({ ...props }) => {
  const {
    label,
    placeholder,
    name,
    ref,
    value,
    onChange,
    isPassword = false,
  } = props;
  return (
    <Box>
      <Text mb={"2px"} fontWeight={"700"}>
        {label}
      </Text>
      <Input
        name={name}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e) : undefined}
        type={isPassword ? "password" : "text"}
      />
    </Box>
  );
};

export default InputWithLabel;
