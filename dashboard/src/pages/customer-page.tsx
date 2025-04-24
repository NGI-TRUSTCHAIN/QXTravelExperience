import TabLayout from "@/components/custom//layout/tab-layout"
import CustomerDataTable from "@/components/custom/table/customer-data-table"
import { apiEndpoints } from "@/constants/api-endpoints"
import { TabTypeEnum } from '@/constants/form'
import { RoutesIdsEnum } from "@/constants/routes"
import { useCustomerById, useFetchCustomers } from "@/hooks/use-customer"
import { useLanguage } from "@/hooks/use-language"
import { useModal } from "@/hooks/use-modal"
import { Customer } from "@/interface/customer"
import { PageTypeEnum } from "@/interface/page"
import { DataSet, DataSetKeyEnum, ItemComponentProps } from "@/interface/set"
import { changeActiveStatus } from "@/services/generic"
import React from 'react'
import { useParams } from "react-router-dom"


const CustomerPage: React.FC = () => {
  const { languageData } = useLanguage()
  const { customerId } = useParams<{ customerId?: string }>()
  const { loading, customers, fetchCustomers } = useFetchCustomers()
  const { fetchCustomer, resetCustomer } = useCustomerById()

  const {
    customer: { onOpen },
  } = useModal()

  React.useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  React.useEffect(() => {
    if (customerId) {
      fetchCustomer({ customerId })
    }
    return () => resetCustomer()
  }, [customerId, fetchCustomer, resetCustomer])

  const handleOpenModal = () => {
    onOpen()
  }

  const handleOnEditCustomerModal = (customer: Customer) => {
    handleOpenModal()
    fetchCustomer({ customerId: customer.id.toString() })
  }

  const handleOnChangeActiveStatusCustomer = async (customer: Customer) => {
    await changeActiveStatus({
      apiEndpoint: apiEndpoints.private.customer.id,
      id: customer.id,
      idPlaceholder: RoutesIdsEnum.customerId,
      body: { active: !customer.active },
    })
  }

  const tabTypes = [TabTypeEnum.all, TabTypeEnum.active, TabTypeEnum.suspend] as TabTypeEnum[]

  const dataSets: DataSet<Customer>[] = [{
    items: customers ?? [],
    key: DataSetKeyEnum.customer,
    separatePagination: false,
    isComponent: true,
    loading: loading
  }]

  const onEdit = (item: Customer, dataSetKey: DataSetKeyEnum) => {
    if (dataSetKey === DataSetKeyEnum.customer) {
      handleOnEditCustomerModal(item)
    }
  }

  const onChangeActiveStatus = (item: Customer, dataSetKey: DataSetKeyEnum) => {
    if (dataSetKey === DataSetKeyEnum.customer) {
      handleOnChangeActiveStatusCustomer(item)
    }
  }


  const ItemComponent: React.FC<ItemComponentProps<Customer>> = ({ items, loading, onEdit, onChangeActiveStatus, dataSetKey, itemsPerPage }) => {
    if (dataSetKey === DataSetKeyEnum.customer) {
      return (
        <div className="w-full">
          <CustomerDataTable
            customers={items}
            customer={null}
            onChangeActiveStatus={onChangeActiveStatus}
            loading={loading}
            onEdit={onEdit}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )
    }
    return null;
  }

  const searchCriteriaProps = (item: Customer, dataSetKey: DataSetKeyEnum) => {
    if (dataSetKey === DataSetKeyEnum.customer) {
      return [
        item.first_name ?? "",
        item.last_name ?? "",
        item.phone_number ?? "",
        item.blockchain_address ?? ""
      ]
    }
    return []
  }

  const getItemActive = (item: Customer, dataSetKey: DataSetKeyEnum) => {
    if (dataSetKey === DataSetKeyEnum.customer) {
      return !!item.active
    }
    return false;
  }

  return (
    <>
      <TabLayout
        dataSets={dataSets}
        handlePrimaryAction={handleOpenModal}
        onEdit={onEdit}
        onChangeActiveStatus={onChangeActiveStatus}
        tabTypes={tabTypes}
        searchCriteriaProps={searchCriteriaProps}
        getItemActive={getItemActive}
        primaryActionLabel={null}
        notFoundMessage={languageData.CustomerCardLabels.customersNotFound}
        itemComponent={ItemComponent}
        pageTypeEnum={PageTypeEnum.customer}
      />
    </>
  )
}

export default CustomerPage