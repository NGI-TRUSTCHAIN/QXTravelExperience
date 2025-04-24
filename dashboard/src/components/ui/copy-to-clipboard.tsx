import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ClipboardIcon } from "lucide-react"
import { toast } from "@/hooks/use-sonner-toast"

export default function CopyToClipboard() {
    return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={() => toast({title: "Copied to clipboard"})}>
                <ClipboardIcon className="ml-2 h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
}