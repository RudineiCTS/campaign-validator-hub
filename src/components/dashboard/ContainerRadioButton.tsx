import { useState } from "react";

interface RadioButtonProps {
  options?: {
    value: string;
    label: string;
    classNameValue:string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
}

const optionsDefault = [
  { label: "Campanha Televendas", value: "televendas", classNameValue:"flex gap-2"},
  { label: "Campanha Farma", value: "farma", classNameValue: "flex gap-2 pointer-events-none opacity-50 cursor-not-allowed" },
  { label: "Campanha Alimentar", value: "alimentar", classNameValue: "flex gap-2 pointer-events-none opacity-50 cursor-not-allowed"  },
];

export function ContainerRadioButton({
  options,
  value,
  onChange,
}: RadioButtonProps) {
  const [internalValue, setInternalValue] = useState("");

  const selected = value ?? internalValue;
  const safeOptions = options?.length ? options : optionsDefault;

  function handleChange(newValue: string) {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  }

  return (
    <div className="flex gap-4">
      {safeOptions.map((option) => (
        <label key={option.value} className={`${option.classNameValue}`}>
          <input
            type="radio"
            name="campaignTeleSeller"
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}