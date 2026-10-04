"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client";
import { Check, ChevronsUpDown, StoreIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface SwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export const Switcher = ({ className, items = [] }: SwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();

  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const currentStore = formatedItems.find(
    (item) => item.value === params.storeId,
  );
  const [open, setOpen] = useState(false);
  const onSelectStore = (store: { label: string; value: string }) => {
    setOpen(false);
    window.location.assign(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formatedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onSelectStore(store)}
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <StoreIcon className="mr-2 h-4 w-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
