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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Plus,
  PackagePlus,
  PackageOpen,
  PackageX,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import { useEffect, useState } from "react";

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
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageEvent, setImageEvent] = useState("");

  const [productName, setProductName] = useState("");
  const [haveImage, setHaveImage] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [onLoading, setOnLoading] = useState("");
  //error handling
  const [error, setError] = useState(false);
  //handle events
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(0);
  //handling Product data.
  const [productData, setProductData] = useState({
    productItems: [0],
    paginationList: [1],
    endPage: 1,
  });

  useEffect(() => {
    requestProductData();
  }, [currentPage]);

  //handle image to be displayed to the form.
  const handleSelectedImages = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      setHaveImage(false);
      return;
    }

    let imagesUrl = [];
    let readers = [];

    //handle each file.
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        //Assigns reader as new file reader.
        const reader = new FileReader();

        //add reader to push with promise method.
        readers.push(
          //add a new promise with method to parse the file and add it on the imagesURL.
          new Promise((resolve) => {
            reader.onload = (e) => {
              imagesUrl.push(e.target.result);
              //mark the method to be resolve(), inditaing the promise is done.
              resolve();
            };
            reader.readAsDataURL(file);
          })
        );
      }
    }

    //waits all added promise to be done before setting it on the useState.
    Promise.all(readers).then(() => {
      setSelectedImages(imagesUrl);
      setHaveImage(true);
    });
  };

  const handleUploadImage = async (files) => {
    //check params if values are supplied.
    setOnLoading(true);
    if (
      !productName ||
      !haveImage ||
      !selectedSize ||
      !unitPrice ||
      !productStock ||
      !selectedCategory
    ) {
      setError(true);
      setOnLoading(false);
      return;
    }

    console.warn("requested");

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    //add field information to the formData.
    formData.append(
      "record",
      JSON.stringify({
        productName,
        selectedSize,
        unitPrice,
        productStock,
        selectedCategory,
      })
    );

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: formData,
    });

    //return a toast depends on the status code.
    if (result.status == 200) {
      toast({
        title: "Success!",
        description: "Product added successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    result = await result.json();
    console.warn(result);

    setError(false);
    setOnLoading(false);
  };

  const requestProductData = async () => {
    let page = currentPage;
    let result = await fetch("http://localhost:5000/products", {
      method: "post",
      body: JSON.stringify({ page }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    setProductData(result);
    console.warn(result);
  };

  return (
    <section className="mx-[8vw] mt-[8vh] mb-20">
      <Toaster />

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

          <DialogContent className="flex sm:max-w-[600px] max-h-[90vh]">
            <div className="flex flex-col flex-1">
              <DialogHeader className="mb-3">
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                  Add your product to be listed in listings.
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="flex-1 rounded-md border p-4">
                <div className="flex flex-col p-1">
                  <div className="flex flex-col mb-3">
                    <Label htmlFor="name" className="text-left mb-2">
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      className="col-span-3"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    {error && !productName && (
                      <Label className="text-rose-400 text-left mt-1 ml-1">
                        Field required.
                      </Label>
                    )}
                  </div>

                  <div className="flex flex-col pb-3">
                    {selectedImages.length > 0 && (
                      <>
                        <Label htmlFor="imgPreview" className="text-left">
                          Product Preview
                        </Label>
                        <div className="image-preview flex flex-col items-center m-2">
                          <Carousel className="w-full max-w-xs items-center">
                            <CarouselContent className="flex items-center">
                              {selectedImages.map((imageSrc, index) => (
                                <CarouselItem key={index}>
                                  <div className="p-1">
                                    <Card>
                                      <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <img
                                          className="w-[90%]"
                                          src={imageSrc}
                                          alt={`Selected ${index + 1}`}
                                        />
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>
                        </div>
                      </>
                    )}

                    <Label htmlFor="picture" className="mb-2">
                      Select Picture
                    </Label>
                    <Input
                      id="picture"
                      type="file"
                      multiple={true}
                      onChange={(e) => {
                        setImageEvent(e.target.files);
                        handleSelectedImages(e);
                      }}
                    />
                    {error && !haveImage && (
                      <Label className="text-rose-400 text-left mt-1 ml-1">
                        Field required.
                      </Label>
                    )}
                  </div>

                  <div className="flex flex-col pb-3">
                    <Label htmlFor="name" className="text-left mb-2">
                      Product Size
                    </Label>
                    <Select onValueChange={(value) => setSelectedSize(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Available Sizes</SelectLabel>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="7.5">7.5</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="8.5">8.5</SelectItem>
                          <SelectItem value="9">9</SelectItem>
                          <SelectItem value="9.5">9.5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="10.5">10.5</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="11.5">11.5</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {error && !selectedSize && (
                      <Label className="text-rose-400 text-left mt-1 ml-1">
                        Field required.
                      </Label>
                    )}
                  </div>

                  <div className="flex flex-col pb-3">
                    <Label htmlFor="name" className="text-left mb-2">
                      Unit Price
                    </Label>
                    <Input
                      id="name"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      pattern="^\d+(?:\.\d{1,2})?$"
                      className="col-span-3"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                    />
                    {error && !unitPrice && (
                      <Label className="text-rose-400 text-left mt-1 ml-1">
                        Field required.
                      </Label>
                    )}
                  </div>

                  <div className="flex flex-col pb-3">
                    <Label htmlFor="name" className="text-left mb-2">
                      Product Stock
                    </Label>
                    <Input
                      id="name"
                      placeholder="0"
                      type="number"
                      min="0"
                      className="col-span-3"
                      value={productStock}
                      onChange={(e) => setProductStock(e.target.value)}
                    />
                    {error && !productStock && (
                      <Label className="text-rose-400 text-left mt-1 ml-1">
                        Field required.
                      </Label>
                    )}
                  </div>

                  <div className="flex flex-col pb-3">
                    <Label htmlFor="name" className="text-left mb-2">
                      Product Category
                    </Label>
                    <Select
                      onValueChange={(value) => setSelectedCategory(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="sneaker">Sneakers</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {error && !selectedCategory && (
                      <Label className="text-rose-400 text-left mt-1 ml-1">
                        Field required.
                      </Label>
                    )}
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter className="mt-3">
                <Button
                  type="submit"
                  onClick={() => handleUploadImage(imageEvent)}
                >
                  {onLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>Save changes</>
                  )}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-5">
        <Table>
          <TableCaption>
            Showing page {currentPage + 1} out of {productData.endPage}
          </TableCaption>
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
            {productData.productItems.length > 0
              ? productData.productItems.map((productItem, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {"PID" + index}
                    </TableCell>
                    <TableCell className="flex items-center justify-start">
                      <div className="product-image">
                        <img
                          src={productItem.url}
                          alt=""
                          className="size-20 object-contain"
                        />
                      </div>
                      <div className="flex-1 ml-3">
                        <h1 className="font-bold text-base text-[#404040]">
                          {productItem.name}
                        </h1>
                        <h4 className="font-medium text-sm text-[#838386]">
                          {"Size:" + productItem.size}
                        </h4>
                      </div>
                    </TableCell>
                    <TableCell>{productItem.unit_price}</TableCell>
                    <TableCell>{productItem.stock}</TableCell>
                    <TableCell>{productItem.category}</TableCell>
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
                ))
              : console.log("")}
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
                {currentPage >= 1 && (
                  <>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(currentPage - 1)}
                        href="#"
                      />
                    </PaginationItem>
                  </>
                )}

                {productData.paginationList.map((value, index) => (
                  <PaginationItem key={value}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(value - 1)}
                    >
                      {value}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {currentPage < productData.endPage && (
                  <>
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(currentPage + 1)}
                        href="#"
                      />
                    </PaginationItem>
                  </>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </Card>
    </section>
  );
}
