import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import React from "react"

// type Checked = DropdownMenuCheckboxItemProps["checked"]

interface Option {
  label: string
  value: number
}

interface DropdownMenuCheckboxesProps {
  options: Option[]
  onValueChange: (value: number[]) => void
}

export function DropdownMenuCheckboxes({ options, onValueChange }: DropdownMenuCheckboxesProps) {
  const [selectedValues, setSelectedValues] = React.useState<number[]>([])

  const handleCheckedChange = (value: number, checked: boolean) => {
    const updatedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((val) => val !== value)
    setSelectedValues(updatedValues)
    onValueChange(updatedValues)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent >

        <DropdownMenuLabel>Options</DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
        {options.map((option) => (
          <DropdownMenuCheckboxItem
          key={option.value}
          checked={selectedValues.includes(option.value)}
          onCheckedChange={(checked) => handleCheckedChange(option.value, checked)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}