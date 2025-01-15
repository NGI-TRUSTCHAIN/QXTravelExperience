import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { CopyIcon } from "lucide-react";
import { BlockchainAddressSkeleton } from "../skeleton";

export function BlockchainAddress({ title, address, loading }: { title: string; address: string | undefined, loading: boolean }): JSX.Element {

    const handleCopyAddress = ({ address }: { address: string }) => {
        navigator.clipboard.writeText(address);
        toast({ title: 'Address copied to clipboard', });
    }

    return (
        <div className='flex flex-col gap-2'>
            <h3 className="text-oxfordBlue text-lg font-semibold">
                {title}
            </h3>
            {
                loading ?
                    <BlockchainAddressSkeleton /> :
                    address ?
                    <Alert className="flex justify-between items-center px-2 py-1 border border-silver">
                        <AlertTitle className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
                            {address}
                        </AlertTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyAddress({ address })}>
                            <CopyIcon className="h-4 w-4" />
                        </Button>
                    </Alert> :
                    null
            }

        </div>
    )
}
