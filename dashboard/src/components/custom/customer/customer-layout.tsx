import PlaceholderImage from "@/assets/images/placeholder-image.png"
import { Separator } from "@/components/ui/separator"
import { useCustomerById } from "@/hooks/use-customer"
import { cn } from "@/lib/utils"
import { formatName } from "@/utils/format-name"
import React from "react"
import { CustomerLayoutSkeleton } from "@/components/custom/layout/skeletons"
import { useLanguage } from "@/hooks/use-language"

const CustomerLayout: React.FC = () => {
    const { customer, loading } = useCustomerById()
    const { languageData } = useLanguage()
    // React.useEffect(() => {
    //     if (customerId) {
    //         fetchCustomer({ customerId })
    //     }

    // }, [fetchCustomer, customerId])
    //TODO ADD SKELETON
    // React.useEffect(() => {
    //    console.log(customer)
    // },[customer])
    return (
        <>
            {
                loading ?
                    <CustomerLayoutSkeleton /> :
                    !customer ?
                        null :
                        <div className="bg-muted-darker max-h-screen h-full rounded-lg flex flex-col text-oxfordBlue shadow-xl gap-4 min-w-[300px] border border-border">

                            <div className="flex flex-col justify-between bg-sidebar dark:bg-inherit">
                                <div className="flex flex-row gap-4 justify-start items-center p-4">
                                    <img
                                        src={
                                            customer?.profile_picture ??
                                            PlaceholderImage}
                                        alt="profile_picture"
                                        className="rounded-full w-16 h-16"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-primary">
                                            {formatName({ firstName: customer?.first_name, lastName: customer?.last_name })}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                            </div>


                            <div className="grid grid-cols-2 px-4">
                                <div className="col-span-2">
                                    <h2 className="text-xl text-pretty text-primary font-bold">{languageData.CustomerCardLabels.card.contact}</h2>
                                </div>
                                <>
                                    <Column label={languageData.CustomerCardLabels.table.firstName} value={customer.first_name} />
                                    <Column label={languageData.CustomerCardLabels.table.lastName} value={customer.last_name} />
                                    {/* <Column label="Email Address" value={customer.last_check_in} /> */}
                                    <Column label={languageData.CustomerCardLabels.card.email} value={customer.email} colSpan={2} />
                                    <Column label={languageData.CustomerCardLabels.table.phoneNumber} value={customer.phone_number} colSpan={2} />
                                    <Column label={languageData.CustomerCardLabels.card.gender} value={customer.gender} />
                                    <Column label={languageData.CustomerCardLabels.card.birthday} value={customer.birthday} />
                                    {/* <Column label="Reward Points" value={customer.reward_points} /> */}
                                    <Column label={languageData.CustomerCardLabels.card.walletAddress} value={customer.blockchain_address} colSpan={2} />
                                </>
                            </div>

                            <Separator />

                            <div className="flex flex-col px-4">
                                <RewardPoints rewardPoints={customer.reward_points} />
                            </div>

                            <Separator />
                        </div>
            }
        </>
    )
}

const Column = (
    {
        label,
        value,
        colSpan
    }:
        {
            label: string,
            value: number | string | null | undefined,
            colSpan?: number
        }) => {
    return (
        <div className={cn("my-4", colSpan ? `col-span-${colSpan}` : "col-span-1")}>
            <div className="flex flex-col">
                <h3 className="text-md font-semibold text-primary">
                    {label}
                </h3>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis text-primary text-sm">
                    {value ?? "N/A"}
                </p>
            </div>
        </div>
    )

}
const RewardPoints = ({ rewardPoints }: { rewardPoints: number }) => {
    const { languageData } = useLanguage()
    return (
        <div className="col-span-1">
            <div className="flex flex-col w-full gap-2">
                <h3 className="text-xl font-semibold text-primary">
                    {languageData.CustomerCardLabels.card.rewardPoints}
                </h3>
                <div className="flex justify-center w-full items-center">

                    <div className="rounded-full border-4 border-bg-muted-darker w-12 h-12 bg-muted-darker text-primary text-xl flex items-center justify-center">
                        {rewardPoints ?? 0}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CustomerLayout;
