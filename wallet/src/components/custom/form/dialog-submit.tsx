import { Button, ButtonVariantProps } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";


const DialogSubmit: React.FC<ButtonVariantProps> = ({
    variant,
    text,
    disabled
}) => {
    return (
        <DialogFooter
        className='flex justify-center items-center mx-auto pt-10'
        >
            <Button
                type="submit"
                variant={variant}
                className='w-52 text-lg rounded-3xl'
                disabled={disabled}
            >
                {text}
            </Button>
        </DialogFooter>
    )
}

export default DialogSubmit;