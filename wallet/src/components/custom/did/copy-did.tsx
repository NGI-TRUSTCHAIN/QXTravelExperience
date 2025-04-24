import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { CopyIcon } from "lucide-react";

interface CopyDIDProps {
  did: string;
}

export const CopyDID: React.FC<CopyDIDProps> = ({ did }) => {
  const handleCopyDID = () => {
    navigator.clipboard.writeText(did);
    toast({ title: 'DID copied to clipboard' });
  };

  // Truncate DID to show first 6 and last 4 characters with ellipsis in between
  const truncatedDID = did.length > 12
    ? `${did.substring(0, 6)}...${did.substring(did.length - 4)}`
    : did;

  return (
    <Alert className="flex justify-between items-center px-2 py-1 border border-silver">
      <AlertTitle className="font-bold overflow-hidden whitespace-nowrap" title={did}>
        {truncatedDID}
      </AlertTitle>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyDID}>
        <CopyIcon className="h-4 w-4" />
      </Button>
    </Alert>
  );
};
