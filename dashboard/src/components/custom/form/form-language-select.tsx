import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LanguageEnum } from '@/interface/language';
import { GB } from 'country-flag-icons/react/3x2';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface FormLanguageSelectProps {
    value: LanguageEnum;
    onChange: (value: LanguageEnum) => void;
    availableLanguages: Set<LanguageEnum>;
    dirtyLanguages: Set<LanguageEnum>;
}

const FormLanguageSelect: React.FC<FormLanguageSelectProps> = ({
    value,
    onChange,
    availableLanguages,
    dirtyLanguages
}) => {
    const { languageData } = useLanguage()
    const languageOptions = [
        {
            value: LanguageEnum.EN,
            label: "English",
            icon: <GB className="h-4 w-4 mr-2" />,
            disabled: false
        },
    ];

    const handleValueChange = (newValue: string) => {
        onChange(newValue as LanguageEnum);
    };

    // Determine the status indicator color for each language
    const getStatusIndicator = (lang: LanguageEnum) => {
        if (dirtyLanguages.has(lang)) {
            return {
                color: "bg-amber-500",
                title: "Modified"
            };
        } else if (availableLanguages.has(lang)) {
            return {
                color: "bg-green-500",
                title: "Available"
            };
        } else {
            return {
                color: "bg-red-500",
                title: "Not provided"
            };
        }
    };

    return (
        <div className="flex items-center justify-between gap-2 mt-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="text-sm font-medium border-b-2 border-primary border-dashed">{languageData.FormActionLabels.contentLanguage} </span>
                    </TooltipTrigger>
                    <TooltipContent
                        side="bottom"
                        className="max-w-96 p-3 overflow-hidden absolute rounded-lg -left-16 top-2"
                        sideOffset={5}
                    >
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 flex-shrink-0 rounded-full bg-green-500"></div>
                                <span className="truncate">{languageData.FormActionLabels.available}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 flex-shrink-0 rounded-full bg-amber-500"></div>
                                <span className="truncate">{languageData.FormActionLabels.modified}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 flex-shrink-0 rounded-full bg-red-500"></div>
                                <span className="truncate">{languageData.FormActionLabels.notAvailable}</span>
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Select value={value} onValueChange={handleValueChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{languageData.FormActionLabels.languages}</SelectLabel>
                        {languageOptions.map(option => {
                            const status = getStatusIndicator(option.value);
                            return (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className="flex items-center gap-2"
                                    disabled={option.disabled}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            {option.icon}
                                            <span>{option.label}</span>
                                        </div>
                                        <div>
                                            <div
                                                className={cn(
                                                    'h-3 w-3 rounded-full ml-2',
                                                    !option.disabled && status.color
                                                )}
                                                title={status.title}
                                            />
                                        </div>
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    );
};

export default FormLanguageSelect;
