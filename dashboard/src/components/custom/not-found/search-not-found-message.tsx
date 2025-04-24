import { Button } from "@/components/ui/button";
import { SearchNotFoundMessageProps } from "@/interface/filter";
import React from "react";

const SearchNotFoundMessage: React.FC<SearchNotFoundMessageProps> = ({
    title,
    description,
    action,
    actionTitle,
    hasSearch
}) => {
    return (
        <div className="flex justify-center items-center w-full">
            {
                <div className="flex-col justify-center items-center text-center p-6 bg-secondary min-w-[332px] w-fit rounded-lg min-h-[164px] h-full">
                    <h3 className="text-lg font-semibold mb-2">
                        {title}
                    </h3>
                    {
                        hasSearch ?
                            <>
                                <p className="text-gray-500 mb-4">{description ? description : "Try adjusting your search or filter criteria"}</p>
                                <Button
                                    onClick={action}
                                    variant="outline"
                                >
                                    {actionTitle}
                                </Button>
                            </> :
                            null
                    }
                </div>
            }
        </div>
    )
}

export default SearchNotFoundMessage;