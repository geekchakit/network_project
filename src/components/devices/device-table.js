"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import DataTable from "@/components/data-table";
import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";
import { CircleX } from "lucide-react";

function DeviceTable({ data }) {
  // Transform the data as needed for the table

  const [tableData, setTableData] = useState([]);

  // Update tableData whenever the data prop changes
  useEffect(() => {
    if (data) {
      const deviceList = data?.deviceList;
      const formattedData = deviceList?.map((deviceListData, index) => ({
        id: index,
        name: deviceListData?.name || "N/A", // Provide a default
        type: deviceListData?.type || "N/A", // Provide a default
        sn: index + 1,
        mac: deviceListData?.mac || "N/A", // Provide a fallback if MAC isn't in the data
        ip: deviceListData?.ip || "N/A", // Same for IP
        mode: deviceListData?.mode || "N/A",
        version: deviceListData?.version || "N/A",
        accessTime: deviceListData?.access_time || "N/A", // Or any other relevant field
        status: deviceListData?.status === "1" ? <CircleCheck /> : <CircleX />,
      }));
      setTableData(formattedData);
    }
  }, [data]);

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
      accessorKey: "mac",
      header: "MAC",
      cell: ({ row }) => <div className="lowercase">{row.getValue("mac")}</div>,
    },
    {
      accessorKey: "ip",
      header: "IP",
      cell: ({ row }) => <div className="lowercase">{row.getValue("ip")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "mode",
      header: "Mode",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("mode")}</div>
      ),
    },
    {
      accessorKey: "version",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Version
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("version")}</div>
      ),
    },
    {
      accessorKey: "accessTime",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Access Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("accessTime")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("status")}</div>
      ),
    },
    {
      id: "config",
      enableHiding: false,
      header: "Config",
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <></>
          // <DropdownMenu>
          //   <DropdownMenuTrigger asChild>
          //     <Button variant="ghost" className="h-8 w-8 p-0">
          //       <span className="sr-only">Open menu</span>
          //       <MoreHorizontal className="h-4 w-4" />
          //     </Button>
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent align="end">
          //     <DropdownMenuLabel>Config</DropdownMenuLabel>
          //     <DropdownMenuItem
          //       onClick={() => navigator.clipboard.writeText(payment.id)}
          //     >
          //       Copy payment ID
          //     </DropdownMenuItem>
          //     <DropdownMenuSeparator />
          //     <DropdownMenuItem>View customer</DropdownMenuItem>
          //     <DropdownMenuItem>View payment details</DropdownMenuItem>
          //   </DropdownMenuContent>
          // </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={tableData} />;
}

export default DeviceTable;
