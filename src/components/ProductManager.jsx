import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Plus, PackagePlus, PackageOpen, PackageX } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import Axios from "axios";
import { Image } from "cloudinary-react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function ProductManager() {
  const [image, setImage] = useState("");
  const [imageEvent, setImageEvent] = useState("");

  const handleUploadImage = async (files) => {
    console.warn("requested");

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: formData,
    });

    result = await result.json();

    //TODO: tomorrow Load these code to the image holders to it can preview it.
    console.warn(result.message);
    console.warn(result.urls);

    // for (let i = 0; i < files.length; i++) {
    //   console.log(files[i]);
    // }

    // //collect the data, including file and the upload_present from cloudinary.
    // const formData = new FormData();
    // formData.append("file", files[0]);
    // formData.append("upload_preset", "yib5xuol");

    // //save the data to their api.
    // const resp = await Axios.post(
    //   "https://api.cloudinary.com/v1_1/dchmxjntx/image/upload",
    //   formData
    // );

    // //fetch the public_id of the image that to be stored in the database.
    // const publicId = resp.data.public_id;
    // setImage(publicId);
    // console.log(publicId);
  };

  return (
    <section className="mx-[8vw] mt-[8vh] mb-20">
      <div className="content-title mb-5">
        <h1 className="font-bold text-2xl text-[#404040]">My Inventory</h1>
        <h4 className="font-normal text-sm text-[#AEAEB3]">
          Inventory preview of listed stocks.
        </h4>
      </div>

      <div className="table-action py-3 flex items-center justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="max-h-9">
              <Plus className="pr-2" />
              Create New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Add your product to be listed in listings.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col py-4">
              <div className="flex flex-col py-3">
                <Label htmlFor="name" className="text-left mb-2">
                  Product Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="imgPreview" className="text-left mb-2">
                  Product Preview
                </Label>

                <Image cloudName="dchmxjntx" publicId={image} />

                <Label htmlFor="picture" className="mb-2">
                  Picture
                </Label>
                <Input
                  id="picture"
                  type="file"
                  multiple={true}
                  onChange={(e) => setImageEvent(e.target.files)}
                  className="mb-2"
                />
                <Button onClick={() => handleUploadImage(imageEvent)}>
                  Upload Image
                </Button>
              </div>

              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div> */}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-5">
        <Table>
          <TableCaption>A list of your listed product/s.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Product ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[100px] text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell className="flex items-center justify-start">
                  <div className="product-image">
                    <img
                      src="https://images.stockx.com/images/Stussy-Basic-Stussy-T-Shirt-White.jpg?fit=fill&bg=FFFFFF&w=576&h=384&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1717425505&q=57"
                      alt=""
                      className="size-20 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="font-bold text-base text-[#404040]">
                      Stussy Basic T-shirt White
                    </h1>
                    <h4 className="font-medium text-sm text-[#838386]">
                      Variations:Size, M
                    </h4>
                  </div>
                </TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell>{index}</TableCell>
                <TableCell>Shirt</TableCell>
                <TableCell>
                  <div className="button-wrapper flex items-center justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="flex items-center justify-center"
                            variant="ghost"
                          >
                            <PackagePlus className="size-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add Stock</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="flex items-center justify-center"
                            variant="ghost"
                          >
                            <PackageOpen className="size-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="flex items-center justify-center"
                            variant="ghost"
                          >
                            <PackageX className="size-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {/* <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow> */}
          </TableFooter>
        </Table>

        <div className="table-pagination my-5 flex items-center justify-start">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </Card>
    </section>
  );
}
