import PaginationComponent from "@/components/custom/layout/pagination-component"
import SearchNotFoundMessage from "@/components/custom/not-found/search-not-found-message"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusEnum, TabTypeEnum } from "@/constants/form"
import useFilter from "@/hooks/use-filter"
import { useLanguage } from "@/hooks/use-language"
import { useMediaQuerySize } from "@/hooks/use-media-query"
import usePagination from "@/hooks/use-pagination"
import { PageTypeEnum } from "@/interface/page"
import { DataSet, DataSetKeyEnum, ItemComponentProps } from "@/interface/set"
import { TabLayoutProps } from "@/interface/tab"
import { cn } from "@/lib/utils"
import { Search } from 'lucide-react'
import React from "react"

function TabLayout<T>({
  dataSets,
  handlePrimaryAction,
  handleSecondaryAction,
  onEdit,
  onChangeActiveStatus,
  tabTypes,
  searchCriteriaProps,
  itemComponent: ItemComponent,
  getItemActive,
  primaryActionLabel,
  secondaryActionLabel,
  notFoundMessage,
  pageTypeEnum,
  optionalItemComponent,
}: TabLayoutProps<T>) {
  const { languageData } = useLanguage()
  const [activeTab, setActiveTab] = React.useState<TabTypeEnum | StatusEnum>(TabTypeEnum.all || StatusEnum.all)
  const { isSmallScreen } = useMediaQuerySize()

  const handleSearchFilter = React.useCallback(
    (item: T, searchTerm: string, dataSetKey: DataSetKeyEnum) =>
      searchCriteriaProps(item, dataSetKey).some((criteria) =>
        criteria.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchCriteriaProps]
  )

  const handleTabFilter = React.useCallback(
    (item: T, dataSetKey: DataSetKeyEnum) => {
      // Handle TabTypeEnum cases (active/suspend)
      if (Object.values(TabTypeEnum).includes(activeTab as TabTypeEnum)) {
        if (activeTab === TabTypeEnum.active) {
          return getItemActive(item, dataSetKey)
        } else if (activeTab === TabTypeEnum.suspend) {
          return !getItemActive(item, dataSetKey)
        }
        return true
      }

      // Handle StatusEnum cases (pending/denied/approved)
      if (Object.values(StatusEnum).includes(activeTab as StatusEnum)) {
        if (activeTab === StatusEnum.all) {
          return true
        }

        // Use type assertion to access the status property
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const itemAsAny = item as any;
        if (itemAsAny && 'status' in itemAsAny) {
          return itemAsAny.status === activeTab;
        }
      }

      return true
    },
    [activeTab, getItemActive]
  )

  const { filteredDataSets, setSearchTerm, currentSearchTerm } = useFilter<T>({
    dataSets,
    searchTerm: "",
    handleSearchFilter,
    handleTabFilter,
  })

  const handleResetSearchFilter = () => {
    setSearchTerm("")
  }

  const handleSetActiveTab = React.useCallback((value: string) => {
    setActiveTab(value as TabTypeEnum)
  }, [])

  return (
    <div className={cn("bg-sidebar h-inherit")}>
      {/* <div className="overflow-hidden p-4 flex flex-col gap-2">
      <TitleLayout title={title} subTitle={subTitle} />
      <Separator className="px-4" />
      </div> */}
      <div className="flex flex-col h-full p-4">
        <Tabs
          value={activeTab}
          onValueChange={handleSetActiveTab}
          className="flex flex-col h-full gap-4"
        >
          <div className="z-30">
            <div className="gap-4 bg-muted-darker border border-border p-4 md:py-8 rounded-lg shadow-xl items-center justify-between flex-wrap lg:flex-nowrap flex flex-col md:flex-row">
              <div className="flex gap-4 w-full md:w-auto">
                {primaryActionLabel && handlePrimaryAction ? (
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-lg w-full md:w-44 uppercase"
                    onClick={handlePrimaryAction}
                  >
                    {primaryActionLabel}
                  </Button>
                ) : (
                  <div className="w-full md:w-44 hidden lg:block" />
                )}
                {secondaryActionLabel && handleSecondaryAction ? (
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-lg w-full md:w-44 uppercase"
                    onClick={handleSecondaryAction}
                  >
                    {secondaryActionLabel}
                  </Button>
                ) : (
                  <div className="w-auto hidden lg:block" />
                )}
              </div>
              <TabsList className="flex justify-center bg-transparent gap-2 xl:gap-6 w-full md:w-auto">
                {tabTypes.map((tabValue, index) => (
                  <TabsTrigger
                    key={tabValue}
                    className=" text-primary rounded-lg h-9 px-4 w-full md:min-w-32 whitespace-nowrap uppercase"
                    value={tabValue}
                    tabIndex={index + 1}
                  >
                    {languageData.FilterGridLabels[tabValue]}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="relative w-full xl:w-auto xl:min-w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={languageData.FilterGridLabels.search}
                  className="pl-8 w-full rounded-lg"
                  value={currentSearchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  tabIndex={tabTypes.length + 1}
                />
              </div>
            </div>
          </div>

          {optionalItemComponent ? optionalItemComponent : null}

          <div className={cn("w-full h-full",)}>
            {tabTypes.map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className={
                cn("min-w-full",
                  pageTypeEnum === PageTypeEnum.tokenId && "grid col-span-1 md:grid-cols-3 gap-8 h-full",
                  filteredDataSets.some(dataSet => dataSet.items.length > 0) || !currentSearchTerm ? "" : "flex justify-center items-center"
                )
              }>
                {filteredDataSets.some(dataSet => dataSet.items.length > 0) || !currentSearchTerm ? (
                  filteredDataSets.map((dataSet) => {
                    if (!dataSet.isComponent) return null;

                    return (
                      <div
                        key={dataSet.key}
                        className={
                          cn("h-full",
                            dataSet.key === DataSetKeyEnum.token && "col-span-1 md:col-span-1 h-full",
                            dataSet.key === DataSetKeyEnum.token && "col-span-1 md:col-span-2 h-full",

                          )}>
                        <TabLayoutItem
                          dataSet={dataSet}
                          isSmallScreen={isSmallScreen}
                          onEdit={(item: T) => onEdit(item, dataSet.key)}
                          onChangeActiveStatus={(item: T) =>
                            onChangeActiveStatus(item, dataSet.key)
                          }
                          ItemComponent={ItemComponent}
                        />
                      </div>
                    )
                  })
                ) : (
                  <SearchNotFoundMessage
                    title={notFoundMessage}
                    action={handleResetSearchFilter}
                    actionTitle={languageData.FilterGridLabels.clearFilters}
                    hasSearch={!!currentSearchTerm}
                  />
                )}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default TabLayout

function TabLayoutItem<T>({
  dataSet,
  isSmallScreen,
  ItemComponent,
  onEdit,
  onChangeActiveStatus,
}: {
  dataSet: DataSet<T>;
  isSmallScreen: boolean;
  ItemComponent: React.ComponentType<ItemComponentProps<T>>;
  onEdit: (item: T) => void;
  onChangeActiveStatus: (item: T) => void;
}) {
  const {
    currentPageItems,
    currentPage,
    totalPages,
    setCurrentPage,
    firstNumberOfPages,
    childrenPerPage: itemsPerPage,
    itemsPerRow,
  } = usePagination<T>({ items: dataSet.items });

  return (
    <PaginationComponent
      items={currentPageItems}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      hasSeperatePagination={!!dataSet.separatePagination}
      displaySecondPagination={currentPageItems.length > itemsPerRow}
      firstNumberOfPages={firstNumberOfPages}
      isSmallScreen={isSmallScreen}
      loading={dataSet.loading}
    >
      <ItemComponent
        items={currentPageItems}
        loading={dataSet.loading}
        onEdit={(item: T) => onEdit(item)}
        onChangeActiveStatus={(item: T) => onChangeActiveStatus(item)}
        itemsPerPage={itemsPerPage}
        dataSetKey={dataSet.key}
      />
    </PaginationComponent>
  );
}
