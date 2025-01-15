import { Skeleton } from "../ui/skeleton"

export const ProfileInfoSectionSkeleton = () : JSX.Element => {
    return (
        <Skeleton className="w-full h-[170px] rounded-lg bg-slate-400" />
    )
}

export const AvatarLogoSkeleton = () : JSX.Element => {
    return (
        <Skeleton className="w-32 h-32 rounded-full bg-slate-400" />
    )
}
export const BlockchainAddressSkeleton = () : JSX.Element => {
    return (
        <Skeleton className="w-full h-[46px] rounded-lg bg-slate-400" />
    )
}

export const MnemonicSkeleton = () : JSX.Element => {
    return (
        <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                    <MnemonicWordSkeleton key={index} />
                ))}
            </div>
            <div className="flex flex-col gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                    <MnemonicWordSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export const MnemonicWordSkeleton = () : JSX.Element => {
    return (
        <div className="text-oxfordBlue">
            <Skeleton className="text-xl w-28 h-5 bg-slate-400" />
            <Skeleton className="bg-slate-300 min-w-32 max-w-40 h-1 mt-1" />
        </div>
    );
};

export const WalletDrawerSkeleton = () : JSX.Element => {
    return (
        <div className="flex justify-center w-full mb-6">
        <Skeleton className="w-[208px] h-[40px] rounded-3xl bg-slate-400" />
        </div>
    )
}

export const CombinedTokenBalanceCardSkeleton = () : JSX.Element => {
    return (
        <div className="bg-background flex flex-col justify-end items-center p-4 gap-2">
            <Skeleton className="w-24 h-10 bg-slate-400" />
            <Skeleton className="w-64 h-6 bg-slate-400" />
        </div>
    )
}