
// import React, { useState, useEffect } from 'react'
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

// interface Column<T> {
//   id: string
//   header: React.ReactNode
//   cell: (item: T) => React.ReactNode
// }

// interface GenericTableDropzoneProps<T> {
//   items: T[]
//   columns: Column<T>[]
//   getItemId: (item: T) => string
//   onOrderChange: (newOrder: { id: string; sort_id: number }[]) => Promise<void>
//   languageData: {
//     rowsSelected: string
//     saveOrder: string
//   }
// }

// export default function GenericTableDropzone<T>({
//   items,
//   columns,
//   getItemId,
//   onOrderChange,
//   languageData
// }: GenericTableDropzoneProps<T>) {
//   const [orderedItems, setOrderedItems] = useState(items)

//   useEffect(() => {
//     setOrderedItems(items)
//   }, [items])

//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return

//     const reorderedItems = Array.from(orderedItems)
//     const [reorderedItem] = reorderedItems.splice(result.source.index, 1)
//     reorderedItems.splice(result.destination.index, 0, reorderedItem)

//     setOrderedItems(reorderedItems)

//     const newOrder = reorderedItems.map((item, index) => ({
//       id: getItemId(item),
//       sort_id: index + 1,
//     }))

//     onOrderChange(newOrder)
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="w-full bg-muted-darker rounded-lg px-4 overflow-hidden max-w-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-full mx-auto shadow-xl">
//         <ScrollArea className="w-full whitespace-nowrap">
//           <div className="max-w-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-full border rounded-lg">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableHead key={column.id}>{column.header}</TableHead>
//                   ))}
//                 </TableRow>
//               </TableHeader>
//               <Droppable droppableId="items">
//                 {(provided) => (
//                   <TableBody {...provided.droppableProps} ref={provided.innerRef}>
//                     {orderedItems.map((item, index) => (
//                       <Draggable key={getItemId(item)} draggableId={getItemId(item)} index={index}>
//                         {(provided, snapshot) => (
//                           <TableRow
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={cn(
//                               snapshot.isDragging ? "bg-muted" : "",
//                               "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
//                             )}
//                           >
//                             {columns.map((column) => (
//                               <TableCell key={column.id}>
//                                 {column.cell(item)}
//                               </TableCell>
//                             ))}
//                           </TableRow>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </TableBody>
//                 )}
//               </Droppable>
//             </Table>
//           </div>
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>
//         <div className="flex items-center justify-end space-x-2 py-4">
//           <div className="flex-1 text-sm text-muted-foreground lowercase">
//             {orderedItems.length} {languageData.rowsSelected}
//           </div>
//           <Button
//             onClick={() => {
//               const newOrder = orderedItems.map((item, index) => ({
//                 id: getItemId(item),
//                 sort_id: index + 1,
//               }))
//               onOrderChange(newOrder)
//             }}
//           >
//             {languageData.saveOrder}
//           </Button>
//         </div>
//       </div>
//     </DragDropContext>
//   )
// }