import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Logout from "@/components/ui/logout"

import { ModeToggle } from "@/components/ui/mode-toggle"

  export function NavbarActions() {
    return (
      <DropdownMenu>
          <DropdownMenuTrigger>File</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
                <ModeToggle />
                {/* <MenubarShortcut>⌘O</MenubarShortcut> */}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
                <Logout />
                {/* <MenubarShortcut>⌘O</MenubarShortcut> */}
            </DropdownMenuItem>

          </DropdownMenuContent>

      </DropdownMenu>
    )
  }