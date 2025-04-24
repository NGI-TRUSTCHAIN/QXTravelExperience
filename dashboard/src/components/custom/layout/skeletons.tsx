import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SideNavSkeleton({ length }: { length: number }) {
    return (
        <div className="flex flex-col p-4 gap-2">
            {[...Array(length)].map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-11 w-full rounded-lg"
                />
            ))}
        </div>
    )
}

export function SearchNotFoundSkeleton() {
    return (
        <Skeleton className="w-full max-w-[332px] h-[164px] rounded-lg" />
    )
}

export function AuthCardSkeleton() {
    return (
        <Card className="w-full max-w-96 mx-4 bg-slate-300 h-[402px]">
            <CardHeader>
                <CardTitle className="text-2xl text-center">
                    <Skeleton className="w-2/4 h-8 mx-auto" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="w-full h-[72px]" />
                <Skeleton className="w-full h-[72px]" />
            </CardContent>
            <CardFooter className="flex flex-col gap-8">
                <Skeleton className="w-full h-9" />
                <Skeleton className="w-full h-9" />
            </CardFooter>
        </Card>
    )
}

export function TitleLayoutSkeleton() {
    return (
        <Skeleton className="h-8 hidden z-10 mx-4 my-5 sm:grid grid-flow-row lg:pr-0 overflow-hidden whitespace-nowrap text-ellipsis" />
    )
}

export function DataTableSkeleton({ length, actionsLength = 1, rowHeight, }: { length: number, actionsLength?: number, rowHeight?: number | null }) {
    return (
        <>
            <div className="flex items-center justify-end py-4 gap-4">
            {[...Array(actionsLength)].map((_, rowIndex) => (
                <Skeleton key={rowIndex} className="w-28 h-10 rounded-lg" />
            ))}
            </div>
            <div className="rounded-lg border">
                <div className="w-full">
                    {[...Array(length)].map((_, rowIndex) => (
                        <div className="overflow-hidden" key={rowIndex}>
                            <div  className="flex">
                                <Skeleton className={cn("w-full m-2", rowIndex === 0 ? "h-8" : rowHeight ? `h-${rowHeight}` : "h-12")} />
                            </div>
                            <div className="mx-2">
                                {
                                    rowIndex !== length - 1 ?
                                        <Separator />
                                        : null
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-start space-x-2 py-4">
                <Skeleton className="w-40 h-8" />
            </div>
        </>
    )
}

export function PaginationSkeleton () {
    return (
        <Skeleton className="w-full max-w-80 h-10" />
    )
}

export function ChatListSkeleton({ length }: { length: number }) {
    return (
        <>
            <div className=" flex flex-col p-4 bg-muted-darker gap-4 h-full">
            <div className="py-4 px-2 mb-2">
            <Skeleton className="w-full h-9" />
            </div>
            {[...Array(length)].map((_, i) => (
                <div key={i} className="flex items-center h-[60px]">
                    <Skeleton className="w-12 h-12 rounded-full mr-4" />
                    <div className="flex flex-col flex-grow gap-1">
                        <Skeleton className="w-40 h-6" />
                        <Skeleton className="w-64 h-6" />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <Skeleton className="w-20 h-8" />
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}

export function ChatMessagesSkeleton({ length }: { length: number }) {
    return (
        <>
            {[...Array(length)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-end gap-2">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center justify-between">
                                <Skeleton className="w-20 h-6" />
                                <Skeleton className="w-20 h-6" />
                            </div>
                            <Skeleton className="w-full h-8" />
                        </div>
                    </div>
                    <Skeleton className="w-full h-8" />
                </div>
            ))}
        </>
    )
}

export function ChatMessagesEmptySkeleton() {
    return (
        <div className="flex items-center justify-center h-full bg-muted-darker">
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-64 h-6" />
            </div>
        </div>
    )
}

export function WelcomeMessageSkeleton() {
    return (
        <div className="flex flex-col gap-4 h-full">
            <Skeleton className="w-40 h-10 bg-slate-300" />
            <div className="flex flex-col mb-10 gap-1">
            <Skeleton className="w-20 h-6 bg-slate-300" />
            <Skeleton className="w-full h-20 bg-slate-300" />
            </div>
            <div className="flex items-center justify-center gap-4">
                <Skeleton className="w-20 h-9 bg-slate-300" />
                <Skeleton className="w-20 h-9 bg-slate-300" />
            </div>
        </div>
    )
}

export function CustomerLayoutSkeleton () {
    return (
        <div className="bg-muted-darker max-h-screen h-full rounded-lg flex flex-col text-oxfordBlue shadow-xl gap-4 min-w-[300px] border border-border">
            <div className="flex flex-col justify-between bg-sidebar dark:bg-inherit">
                <div className="flex flex-row gap-4 justify-start items-center p-4">
                    <Skeleton className="rounded-full w-16 h-16" />
                    <div>
                        <Skeleton className="h-6 w-40" />
                    </div>
                </div>
                <Separator />
            </div>

            <div className="grid grid-cols-2 px-4">
                <div className="col-span-2">
                    <Skeleton className="h-7 w-40 mb-2" />
                </div>
                <>
                    <ColumnSkeleton />
                    <ColumnSkeleton />
                    <ColumnSkeleton colSpan={2} />
                    <ColumnSkeleton colSpan={2} />
                    <ColumnSkeleton />
                    <ColumnSkeleton />
                    <ColumnSkeleton colSpan={2} />
                </>
            </div>

            <Separator />

            <div className="flex flex-col px-4">
                <div className="col-span-1">
                    <div className="flex flex-col w-full gap-2">
                        <Skeleton className="h-7 w-32" />
                        <div className="flex justify-center w-full items-center">
                            <Skeleton className="rounded-full w-12 h-12" />
                        </div>
                    </div>
                </div>
            </div>

            <Separator />
        </div>
    )
}

function ColumnSkeleton({ colSpan }: { colSpan?: number } = {}) {
    return (
        <div className={cn("my-4", colSpan ? `col-span-${colSpan}` : "col-span-1")}>
            <div className="flex flex-col">
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-4 w-36" />
            </div>
        </div>
    )
}