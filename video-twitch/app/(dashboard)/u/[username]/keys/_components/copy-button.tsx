"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  value?: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);
  
    const onCopy = () => {
      if (!value) return; // Fixed the conditional logic
      setIsCopied(true);
      navigator.clipboard.writeText(value);
      setTimeout(() => setIsCopied(false), 2000); // Added a timeout value and fixed syntax
    };
  
    const Icon = isCopied ? CheckCheck : Copy;
  
    return (
      <Button
        onClick={onCopy}
        disabled={!value}
        variant="ghost"
        size="sm" // Fixed the size prop syntax
      >
        <Icon className="h-4 w-4" />
      </Button>
    );
  };
  
