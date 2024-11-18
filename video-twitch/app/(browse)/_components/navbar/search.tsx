"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {

  return (
    <form
    onSubmit={()=>{}}
    className="relative w-full lg:w-[400px] flex items-center">
        <Input
          className="w-full pl-10 pr-32 bg-gray-50 border-0 rounded-md focus:outline-none focus:ring-0"
          placeholder="Search for streams, games, or channels"
        />
        <Button
          className="flex-shrink-0 ml-3 text-sm text-gray-500 hover:text-gray-400"
          variant="secondary"
          size="small"
          asChild
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
  
    </form>
  );
};
