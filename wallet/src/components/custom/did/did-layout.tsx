import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { useFetchDIDs } from '@/hooks/use-blockchain'
import { useLanguage } from '@/hooks/use-language'
import { CheckIcon, XIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { CopyDID } from './copy-did'

const DIDLayout: React.FC = () => {
    const { fetchDIDs, loading, dids, } = useFetchDIDs();
    const { languageData } = useLanguage();

    useEffect(() => {
        fetchDIDs();
    }, [fetchDIDs]);

    return (
        <div className='px-4 flex flex-col flex-grow gap-6 mt-6'>
            <div className='text-center'>
                <h2 className="text-3xl font-bold mb-4">
                    {languageData.DIDLabels.title}
                </h2>
                <p className='font-bold'>
                    {languageData.DIDLabels.description}
                </p>
            </div>

            <div className="w-full">
                {loading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-12 bg-slate-200 rounded"></div>
                        <div className="h-20 bg-slate-200 rounded"></div>
                        <div className="h-20 bg-slate-200 rounded"></div>
                    </div>
                )
                    :
                    // error ? (
                    //   <div className="text-red-500 text-center py-4">
                    //     {error}
                    //   </div>
                    // )
                    // :
                    dids && dids.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow className='border-b border-silver'>
                                    <TableHead>
                                        {languageData.DIDLabels.table.name}
                                    </TableHead>
                                    <TableHead>
                                        {languageData.DIDLabels.table.did}
                                    </TableHead>
                                    <TableHead>
                                        {languageData.DIDLabels.table.created}
                                    </TableHead>
                                    <TableHead>
                                        {languageData.DIDLabels.table.status}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dids.map((did, index) => (
                                    <TableRow key={index} className='border-b border-silver'>
                                        <TableCell className="font-medium">{did.name}</TableCell>
                                        <TableCell>
                                            <CopyDID did={did.did} />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(did.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <DIDValid valid={did.valid} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No DIDs found. Create a new DID to get started.
                        </div>
                    )}
            </div>
        </div>
    )
}


const DIDValid = ({ valid }: { valid: boolean }) => {
    const { languageData } = useLanguage();
    return valid ? (
        <div className='border-2 border-green-500 bg-green-500 bg-opacity-10 rounded-full p-1 flex gap-2'>
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span className="text-green-500 font-bold">{languageData.DIDLabels.table.valid}</span>
        </div>
    ) : (
        <div className='border-2 border-red-500 bg-red-500 bg-opacity-10 rounded-full p-1 flex gap-2'>
            <XIcon className="h-5 w-5 text-red-500" />
            <span className="text-red-500 font-bold">{languageData.DIDLabels.table.invalid}</span>
        </div>
    )
}

export default DIDLayout