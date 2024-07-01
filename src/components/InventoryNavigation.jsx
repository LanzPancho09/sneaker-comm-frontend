import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Package,
  AlignJustify,
} from "lucide-react";

export default function InventoryNavigation() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  return (
    <section
      className={`h-screen fixed top-0 left-0 z-10 ${
        expanded ? "max-w-64" : "max-w-16"
      }`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="sidebar-logo p-3 pb-2 flex justify-between items-center border-b">
          <h1
            onClick={() => navigate("/")}
            className={`font-extrabold text-2xl text-[#101010] cursor-pointer overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            SNKRS
          </h1>
          <Button
            variant="ghost"
            onClick={() => setExpanded((curr) => !curr)}
            className="w-10 p-1 flex items-center justify-center overflow-hidden transition-all"
          >
            {expanded ? (
              <ArrowLeftFromLine className="size-5" />
            ) : (
              <ArrowRightFromLine className="size-5" />
            )}
          </Button>
        </div>

        {/* Button List */}
        <ul className="flex-1 p-3">
          <li className="mb-1">
            <Button
              onClick={() => console.warn(expanded)}
              className={`h-9 flex items-center bg-[#101010] overflow-hidden transition-all ${
                expanded ? "w-full justify-start" : "w-10 p-1 justify-center"
              }`}
            >
              {expanded ? (
                <>
                  <Package className="size-5 mr-3" />
                  Inbox
                </>
              ) : (
                <Package className="size-5" />
              )}
            </Button>
          </li>

          <li className="mb-1">
            <Button
              variant="ghost"
              onClick={() => console.warn(expanded)}
              className={`h-9 flex items-center overflow-hidden transition-all ${
                expanded ? "w-full justify-start" : "w-10 p-1 justify-center"
              }`}
            >
              {expanded ? (
                <>
                  <AlignJustify className="size-5 mr-3" />
                  Others
                </>
              ) : (
                <AlignJustify className="size-5" />
              )}
            </Button>
          </li>
        </ul>

        <div className="border-t flex p-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div
            className={`flex justify-between items-center ml-3 overflow-hidden transition-all ${
              expanded ? "w-52" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

// export default InventoryNavigation;
