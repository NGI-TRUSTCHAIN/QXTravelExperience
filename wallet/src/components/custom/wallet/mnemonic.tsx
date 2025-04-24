import { Separator } from "@/components/ui/separator";

export function Mnemonic({ mnemonic }: { mnemonic: string[] }): JSX.Element {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 ">
                {mnemonic.map((word, index) => (
                    index < 6 && (
                        <div key={index} className="text-oxfordBlue">
                            <span className="text-xl">
                                {index + 1} {word}
                            </span>
                            <Separator className="bg-slate-300 min-w-32 max-w-40" />
                        </div>
                    )
                ))}
            </div>
            <div className="flex flex-col gap-2">
                {mnemonic.map((word, index) => (
                    index >= 6 && (
                        <div key={index} className="text-oxfordBlue ">
                            <span className="text-xl">
                                {index + 1} {word}
                            </span>
                            <Separator className="bg-slate-300 min-w-32 max-w-40" />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}