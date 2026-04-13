"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface ArrayInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  description?: string;
  error?: string;
}

export function ArrayInput({
  label,
  value,
  onChange,
  placeholder,
  description,
  error,
}: ArrayInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
        />
        <Button type="button" onClick={handleAdd} size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {/* {error && <p className="text-sm text-destructive">{error}</p>} */}
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((item, index) => (
          <Badge key={index} variant="secondary" className="gap-1">
            {item}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="ml-1 hover:text-destructive"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
