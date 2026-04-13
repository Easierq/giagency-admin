import { cn } from "@/lib/utils";

type ButtonSelectProps = {
  value?: string;
  options: string[];
  onChange: (value: string) => void;
};

export function ButtonSelect({ value, options, onChange }: ButtonSelectProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((option) => {
        const active = value === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "px-4 py-3 rounded-lg border-2 font-semibold transition-all",
              "hover:border-green-400 hover:bg-green-50",
              active
                ? "border-green-600 bg-green-100 text-green-700 shadow"
                : "border-gray-200 bg-white text-gray-700"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
