import { useLanguage } from "@/hooks/use-language";
import { CombinedTokenBalance } from "@/interface/user";

export function CombinedTokenBalanceCard({ combinedTokenBalance }: { combinedTokenBalance: CombinedTokenBalance }): JSX.Element {
    const { languageData } = useLanguage()
    return (
        <div className="bg-background flex flex-col justify-end items-center p-4 gap-2 rounded-2xl">
            <h2 className="font-semibold text-4xl">{combinedTokenBalance.combined_balance}</h2>
            <p className="text-silver">
                {languageData.AccountsLabels.active.tokenDescription}
            </p>
        </div>
    )
}
