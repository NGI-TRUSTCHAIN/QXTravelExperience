import { useLanguage } from '@/hooks/use-language';

function PolicyLabels(): JSX.Element {
    const { languageData } = useLanguage();
    return (
        <div className='flex flex-col gap-4 mt-8'>
            <h2 className="text-3xl font-bold text-center mb-4">
                {languageData.PolicyLabels.title}
            </h2>
            <p className='font-bold'>
                {languageData.PolicyLabels.date}
            </p>

            <div>
                <h3 className='font-bold'>
                    {languageData.PolicyLabels.introduction.title}
                </h3>
                <p className=''>
                    {languageData.PolicyLabels.introduction.description}
                </p>
            </div>

            <div>
                <h3 className='font-bold'>
                    {languageData.PolicyLabels.privacy.title}
                </h3>
                <p className=''>
                    {languageData.PolicyLabels.privacy.description}
                </p>
            </div>

            <div>
                <h3 className='font-bold'>
                    {languageData.PolicyLabels.dataControl.title}
                </h3>
                <p className=''>
                    {languageData.PolicyLabels.dataControl.description}
                </p>
            </div>

            <div>
                <h3 className='font-bold'>
                    {languageData.PolicyLabels.dataUsage.title}
                </h3>
                <p className=''>
                    {languageData.PolicyLabels.dataUsage.description}
                </p>
            </div>

        </div>
    )
}

export default PolicyLabels