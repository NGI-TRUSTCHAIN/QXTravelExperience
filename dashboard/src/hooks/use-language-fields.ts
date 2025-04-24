import { LanguageEnum } from '@/interface/language';
import { useState, useCallback, useEffect } from 'react';

// Define an interface for tracking multilingual fields
interface MultilingualField {
    value: string;
    language: LanguageEnum;
    isDirty: boolean;
}

type MultilingualFields<T extends string> = {
    [K in T]: Record<LanguageEnum, MultilingualField>;
};

interface UseLanguageFieldsProps {
    initialLanguage: LanguageEnum;
    currentLanguage?: LanguageEnum;  // Make this optional since it might not always be provided
}

export function useLanguageFields<T extends string>(
    fieldNames: T[],
    { initialLanguage, currentLanguage }: UseLanguageFieldsProps
) {
    // Create the initial state structure based on field names
    const initialFieldsState = fieldNames.reduce((acc, fieldName) => {
        acc[fieldName] = {} as Record<LanguageEnum, MultilingualField>;
        return acc;
    }, {} as MultilingualFields<T>);

    // State for multilingual fields
    const [multilingualFields, setMultilingualFields] = useState<MultilingualFields<T>>(initialFieldsState);

    // Keep track of which languages have data and which are modified
    const [availableLanguages, setAvailableLanguages] = useState<Set<LanguageEnum>>(new Set([initialLanguage]));
    const [dirtyLanguages, setDirtyLanguages] = useState<Set<LanguageEnum>>(new Set());

    // Track the current language separately in case it changes
    const [activeLanguage, setActiveLanguage] = useState<LanguageEnum>(currentLanguage || initialLanguage);

    // Update active language when currentLanguage prop changes
    useEffect(() => {
        if (currentLanguage && currentLanguage !== activeLanguage) {
            setActiveLanguage(currentLanguage);
        }
    }, [currentLanguage, activeLanguage]);

    // Mark a language as dirty (modified)
    const markLanguageDirty = useCallback((language: LanguageEnum) => {
        setDirtyLanguages(prev => {
            const updated = new Set(prev);
            updated.add(language);
            return updated;
        });

        // Add to available languages as well
        setAvailableLanguages(prev => {
            const updated = new Set(prev);
            updated.add(language);
            return updated;
        });
    }, []);

    // Update a multilingual field - use useCallback to ensure stability
    const updateField = useCallback((fieldName: T, value: string, language: LanguageEnum, isDirty: boolean = true) => {
        setMultilingualFields(prev => {
            // Only update if value actually changed to prevent unnecessary renders
            const currentValue = prev[fieldName][language]?.value;
            if (currentValue === value) return prev;

            return {
                ...prev,
                [fieldName]: {
                    ...prev[fieldName],
                    [language]: {
                        value,
                        language,
                        isDirty: isDirty || prev[fieldName][language]?.isDirty || false
                    }
                }
            };
        });

        if (isDirty) {
            markLanguageDirty(language);
        }

        // Always ensure this language is in available languages
        setAvailableLanguages(prev => {
            if (prev.has(language)) return prev;
            const updated = new Set(prev);
            updated.add(language);
            return updated;
        });
    }, [markLanguageDirty]);

    // Get the value of a multilingual field - use useCallback to ensure stability
    const getFieldValue = useCallback((fieldName: T, language: LanguageEnum): string => {
        return multilingualFields[fieldName][language]?.value || "";
    }, [multilingualFields]);


    // Add a language to available languages
    const addAvailableLanguage = useCallback((language: LanguageEnum) => {
        setAvailableLanguages(prev => {
            const updated = new Set(prev);
            updated.add(language);
            return updated;
        });
    }, []);

    // Reset all state
    const resetState = useCallback(() => {
        setMultilingualFields(initialFieldsState);
        setDirtyLanguages(new Set());
        setAvailableLanguages(new Set([initialLanguage]));
    }, [initialFieldsState, initialLanguage]);

    // Get all multilingual fields data for submission
    const getMultilingualData = useCallback(() => {
        const result = Object.values(LanguageEnum).reduce((acc, lang) => {
            acc[lang] = {};
            return acc;
        }, {} as Record<LanguageEnum, Record<string, string>>);

        // Initialize with all available languages
        Array.from(availableLanguages).forEach(lang => {
            result[lang] = {};
        });

        // Fill in fields that have values
        fieldNames.forEach(fieldName => {
            Object.values(LanguageEnum).forEach(lang => {
                const field = multilingualFields[fieldName][lang];
                if (field?.value) {
                    if (!result[lang]) result[lang] = {};
                    result[lang][fieldName] = field.value;
                }
            });
        });

        return result;
    }, [availableLanguages, fieldNames, multilingualFields]);

    // For debugging - dump current multilingual state
    const debugFields = useCallback(() => {
        console.log('Current multilingual state:', JSON.stringify(multilingualFields, null, 2));
        console.log('Available languages:', Array.from(availableLanguages));
        console.log('Dirty languages:', Array.from(dirtyLanguages));
    }, [multilingualFields, availableLanguages, dirtyLanguages]);

    return {
        multilingualFields,
        availableLanguages,
        dirtyLanguages,
        updateField,
        getFieldValue,
        markLanguageDirty,
        addAvailableLanguage,
        resetState,
        getMultilingualData,
        debugFields,
        activeLanguage
    };
}
