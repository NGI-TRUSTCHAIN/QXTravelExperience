import TabLayout from "@/components/custom//layout/tab-layout"
import TokenModal from "@/components/custom/modal/token-modal"
import TokenDataTable from "@/components/custom/table/token-data-table"
import { TabTypeEnum } from '@/constants/form'
import { routes, RoutesIdsEnum } from "@/constants/routes"
import { useFetchNetworks, useFetchTokens } from "@/hooks/use-blockchain"
import { useLanguage } from "@/hooks/use-language"
import { useModal } from "@/hooks/use-modal"
import { Token } from "@/interface/blockchain"
import { PageTypeEnum } from "@/interface/page"
import { DataSet, DataSetKeyEnum, ItemComponentProps } from "@/interface/set"
import React from 'react'
import { useNavigate } from "react-router-dom"

const TokenPage: React.FC = () => {
  const { languageData } = useLanguage()
  const navigate = useNavigate()
  const { loading, tokens, fetchTokens, } = useFetchTokens()
  const { networks, fetchNetworks } = useFetchNetworks()

  const {
    token: { onOpen },
  } = useModal()


  const handleOpenModal = () => {
    onOpen()
  }

  // const handleOnEditTokenModal = (token: Token) => {
  //   fetchToken({ tokenId: token.id.toString() })
  //   handleOpenModal()
  // }

  const handleOnNavigate = (token: Token) => {
    navigate(routes.tokens.id.replace(RoutesIdsEnum.tokenId, token.id.toString()))
  }

  React.useEffect(() => {
    fetchTokens()
  }, [fetchTokens])

  React.useEffect(() => {
    fetchNetworks()
  }, [fetchNetworks])

  const dataSets: DataSet<Token>[] = [
    {
      items: tokens ?? [],
      key: DataSetKeyEnum.token,
      separatePagination: false,
      isComponent: true,
      loading: loading
    },
  ]

  const tabTypes = [TabTypeEnum.all, TabTypeEnum.active, TabTypeEnum.suspend] as TabTypeEnum[]

  const searchCriteriaProps = (item: Token, dataSetKey: DataSetKeyEnum) => {
    if (dataSetKey === DataSetKeyEnum.token) {
      return [item.name ?? "", item.symbol ?? "", item.network_id.toString() ?? ""]
    }
    return []
  }

  const ItemComponent = ({ items, loading, itemsPerPage, dataSetKey }: ItemComponentProps<Token>) => {
    if (dataSetKey === DataSetKeyEnum.token) {
      return (
        <TokenDataTable
          tokens={items}
          networks={networks ?? []}
          onNavigate={handleOnNavigate}
          loading={loading}
          itemsPerPage={itemsPerPage}
        />
      )
    }
    return null
  }

  return (
    <>
      <TabLayout
        dataSets={dataSets}
        handlePrimaryAction={handleOpenModal}
        onEdit={() => { }}
        onChangeActiveStatus={() => { }}
        searchCriteriaProps={searchCriteriaProps}
        tabTypes={tabTypes}
        getItemActive={(token) => !!token.active} // TODO: Implement actual logic for active status
        primaryActionLabel={languageData.TokenModalLabels.title.add}
        notFoundMessage={languageData.TableLabels.notFound}
        itemComponent={ItemComponent}
        pageTypeEnum={PageTypeEnum.token}
      />
      <TokenModal />
    </>
  )
}

export default TokenPage