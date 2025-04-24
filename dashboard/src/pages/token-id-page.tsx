import TabLayout from "@/components/custom/layout/tab-layout"
import TransactionDataTable from "@/components/custom/table/transaction-data-table"
import { TabTypeEnum } from "@/constants/form"
import { routes } from "@/constants/routes"
import { useFetchTokens, useFetchTransactions, useTokenById } from "@/hooks/use-blockchain"
import { useLanguage } from "@/hooks/use-language"
import { useTitle } from "@/hooks/use-navbar"
import { Token, Transaction } from "@/interface/blockchain"
import { PageTypeEnum } from "@/interface/page"
import { DataSet, DataSetKeyEnum, ItemComponentProps } from "@/interface/set"
import React from 'react'
import { useNavigate, useParams } from "react-router-dom"

const TokenIdPage: React.FC = () => {
    const { languageData } = useLanguage()
    const navigate = useNavigate()
    const { tokenId } = useParams<{ tokenId: string }>()
    const { transactions, loading, fetchTransactions } = useFetchTransactions()
    const { tokens, fetchTokens } = useFetchTokens()
    const { token, fetchToken } = useTokenById()
    const { setSubTitle, resetSubTitle } = useTitle()

    const handleNavigationBack = () => {
        navigate(routes.tokens.base)
    }

    React.useEffect(() => {
        if (token) {
            setSubTitle(token.name)
        }
        return () => {
            resetSubTitle()
        }
    }, [token, setSubTitle, resetSubTitle])

    React.useEffect(() => {
        if (tokenId) {
            fetchToken({ tokenId })
            fetchTransactions({ tokenId })
        }
    }, [tokenId, fetchToken, fetchTransactions])

    React.useEffect(() => {
        fetchTokens()
    }, [fetchTokens])

    const dataSets: DataSet<Transaction | Token>[] = [
        {
            items: transactions ?? [],
            key: DataSetKeyEnum.transaction,
            separatePagination: false,
            isComponent: true,
            loading: loading
        },
        {
            items: tokens ?? [],
            key: DataSetKeyEnum.token,
            separatePagination: false,
            isComponent: false,
            loading
        }
    ]

    const ItemComponent = ({ items, loading, itemsPerPage, dataSetKey }: ItemComponentProps<Transaction | Token>) => {

        if (dataSetKey === DataSetKeyEnum.transaction) {
            return (
                <TransactionDataTable
                    transactions={items as Transaction[]}
                    tokens={items as Token[]}
                    loading={loading}
                    itemsPerPage={itemsPerPage}
                />
            )
        }
        return null
    }

    const searchCriteriaProps = (item: Transaction | Token, dataSetKey: DataSetKeyEnum) => {
        if (dataSetKey === DataSetKeyEnum.transaction) {
            return [(item as Transaction).tx_hash]
        }
        // else if (dataSetKey === DataSetKeyEnum.token) {
        //     return [(item as Token).name, (item as Token).symbol]
        // }
        return []
    }

    const getItemActive = (item: Transaction | Token, dataSetKey: DataSetKeyEnum) => {
        if (dataSetKey === DataSetKeyEnum.transaction) {
            return (item as Transaction).status
        }
        return false
    }


    return (
        <>
            <TabLayout
                dataSets={dataSets}
                handlePrimaryAction={handleNavigationBack}
                onEdit={() => { }}
                onChangeActiveStatus={() => { }}
                tabTypes={[TabTypeEnum.all, TabTypeEnum.active, TabTypeEnum.suspend]}
                searchCriteriaProps={searchCriteriaProps}
                getItemActive={getItemActive}
                primaryActionLabel={languageData.SideNavbarLabels.back.label}
                notFoundMessage={languageData.TableLabels.notFound}
                itemComponent={ItemComponent}
                pageTypeEnum={PageTypeEnum.tokenId}
            />
        </>
    )
}

export default TokenIdPage