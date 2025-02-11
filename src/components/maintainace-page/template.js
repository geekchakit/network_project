import React from "react";
import ToggleHeader from "../toggle-header";
import ToggleDisplay from "../toggle-display";
import { Button } from "../ui/button";
import ProjectList from "../projects-list";
import SelectDropdown from "../select-dropdown";
import Searchbar from "../searchbar";
import IconDropdown from "../icon-dropdown";
import { FileInput } from "lucide-react";
import DataTable from "../data-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DatePicker from "../date-picker";

function Template() {
  const dropdownOptions = [
    { label: "All Models", value: "allModels" },
    { label: "Test 1", value: "test1" },
    { label: "Test 2", value: "test2" },
    { label: "Test 3", value: "test3" },
  ];

  const iconDropdownOptions = [
    "Create Account",
    "Reset Account",
    "Delete Account",
  ];

  const data = [
    
  ];

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "sn",
      header: "SN",
      cell: ({ row }) => <div className="capitalize">{row.getValue("sn")}</div>,
    },
    {
      accessorKey: "templateName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Template Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("templateName")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "createAccount",
      header: ({ column }) => {
        return <h1>Create Account</h1>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("createAccount")}</div>
      ),
    },
    {
      accessorKey: "creationTime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Creation Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("creationTime")}</div>
      ),
    },


    //   {
    //     accessorKey: "amount",
    //     header: () => <div className="text-right">Amount</div>,
    //     cell: ({ row }) => {
    //       const amount = parseFloat(row.getValue("amount"));

    //       // Format the amount as a dollar amount
    //       const formatted = new Intl.NumberFormat("en-US", {
    //         style: "currency",
    //         currency: "USD",
    //       }).format(amount);

    //       return <div className="text-right font-medium">{formatted}</div>;
    //     },
    //   },
    {
      id: "config",
      enableHiding: false,
      header: () => {
        return <h1> Config</h1>;
      },
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>config</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <ToggleHeader pageName="Upgrade Log" className="px-6">
        <SelectDropdown className="w-28" options={dropdownOptions} />
        <IconDropdown
          className="border-green-500 min-w-20"
          options={iconDropdownOptions}
        >
          <FileInput size={18} />
          <ChevronDown size={18} />
        </IconDropdown>
      </ToggleHeader>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Template;
