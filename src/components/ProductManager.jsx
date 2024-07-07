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
  DialogClose,
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
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";

export function ProductManager() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageEvent, setImageEvent] = useState("");

  const [productName, setProductName] = useState("");
  const [haveImage, setHaveImage] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentStock, setCurrentStock] = useState(0);

  const [onLoading, setOnLoading] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [reload, setReload] = useState(false);
  //error handling
  const [error, setError] = useState(false);
  //handle events
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(0);
  //handling Product data.
  const [productData, setProductData] = useState({
    productItems: {
      urls: [0],
    },
    paginationList: [0],
    endPage: 0,
  });

  useEffect(() => {
    requestProductData();
  }, [currentPage, reload]);

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

  const handleClearForm = () => {
    setProductName("");
    setHaveImage(false);
    setSelectedSize("");
    setUnitPrice("");
    setProductStock("");
    setSelectedCategory("");
    setSelectedImages([]);
    setImageEvent("");
    setError(false);
  };

  const handleUploadImage = async (files, id, isSave) => {
    //check params if values are supplied.
    console.warn("requested");
    setOnLoading(true);

    let result;

    const formData = new FormData();
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    if (isSave) {
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

      result = await fetch("http://localhost:5000/add-product", {
        method: "post",
        body: formData,
      });
    } else {
      if (!productName || !unitPrice || !productStock) {
        setError(true);
        setOnLoading(false);
        return;
      }

      //add field information to the formData.
      formData.append(
        "record",
        JSON.stringify({
          productName,
          unitPrice,
          productStock,
        })
      );

      //product size and product category will be not be checked in edit.
      result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "put",
        body: formData,
      });
    }

    //return a toast depends on the status code.
    if (result.status == 200) {
      if (isSave) {
        toast({
          title: "Success!",
          description: "Product added successfully!",
        });
      } else {
        toast({
          title: "Success!",
          description: "Product updated successfully!",
        });

        setReload(!reload);
      }
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

    //checks if the response sends no product records.
    if (!result.noData) {
      setProductData(result);
    } else {
      const defaultProductData = {
        productItems: {
          urls: [0],
        },
        paginationList: [0],
        endPage: 0,
      };
      setProductData(defaultProductData);
    }
    console.warn(result);
  };

  const handleDeleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });

    console.warn(result);

    if (result.status == 200) {
      toast({
        title: "Success!",
        description: "Product deleted successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    setCurrentPage(0);
    setReload(!reload);
  };

  const handleAddStock = async (id) => {
    let result = await fetch(`http://localhost:5000/product/add-stock/${id}`, {
      method: "put",
      body: JSON.stringify({ stock: Number(currentStock) }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status == 200) {
      toast({
        title: "Success!",
        description: "Stock added successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    setCurrentPage(0);
    setReload(!reload);
  };

  return (
    <section className="mx-[8vw] mt-[5vh] mb-20">
      <Toaster />

      <div className="content-title mb-5">
        <h1 className="font-bold text-2xl text-[#404040]">My Inventory</h1>
        <h4 className="font-normal text-sm text-[#AEAEB3]">
          Inventory preview of listed stocks.
        </h4>
      </div>

      <div className="table-action py-3 flex items-center justify-end">
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) {
              //hard reload
              // window.location.reload();
              //soft reload
              // window.location.reload(false);
              handleClearForm();
              setReload(!reload);
            }
            setIsOpen(open);
          }}
        >
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
                    {selectedImages.length > 0 ? (
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
                    ) : (
                      <></>
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
                  onClick={() => handleUploadImage(imageEvent, "", true)}
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
            {productData.productItems.length > 0 ? (
              <>
                Showing page {currentPage + 1} out of {productData.endPage + 1}
              </>
            ) : (
              <>No products available.</>
            )}
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
            {productData.productItems.length > 0 &&
              productData.productItems.map((productItem, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{"PID" + index}</TableCell>
                  <TableCell className="flex items-center justify-start">
                    <div className="product-image">
                      <img
                        src={productItem.urls[0].url}
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
                  <TableCell>
                    {productItem.unit_price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>{productItem.stock}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{productItem.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="button-wrapper flex items-center justify-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    className="flex items-center justify-center"
                                    variant="ghost"
                                  >
                                    <PackagePlus className="size-5" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] p-5">
                                  <DialogHeader>
                                    <DialogTitle>Add Stock</DialogTitle>
                                    <DialogDescription>
                                      {
                                        <>
                                          Add stock for{" "}
                                          <span className="font-semibold text-sm text-[#404040]">
                                            {productItem.name}.
                                          </span>
                                        </>
                                      }
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex flex-col">
                                    <div className="mb-2">
                                      <div>
                                        <Label
                                          htmlFor="current-stock"
                                          className="text-right"
                                        >
                                          Current Stock
                                        </Label>
                                        <Input
                                          id="current-stock"
                                          value={productItem.stock}
                                          className="col-span-3"
                                          disabled
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <div>
                                        <Label
                                          htmlFor="stock"
                                          className="text-right"
                                        >
                                          Stock
                                        </Label>
                                        <Input
                                          id="stock"
                                          type="number"
                                          min="0"
                                          defaultValue="0"
                                          value={currentStock}
                                          className="col-span-3"
                                          onChange={(e) =>
                                            setCurrentStock(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button
                                        type="submit"
                                        onClick={() =>
                                          handleAddStock(productItem._id)
                                        }
                                      >
                                        Add Stock
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add Stock</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    className="flex items-center justify-center"
                                    variant="ghost"
                                    onClick={() => {
                                      setSelectedImages([]);
                                      setImageEvent("");
                                      setProductName(productItem.name);
                                      setUnitPrice(productItem.unit_price);
                                      setProductStock(productItem.stock);
                                    }}
                                  >
                                    <PackageOpen className="size-5" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="edit-content flex sm:max-w-[600px] max-h-[90vh]">
                                  <div className="edit-content-wrapper flex flex-col flex-1">
                                    <DialogHeader className="edit-dh mb-3">
                                      <DialogTitle>Edit Product</DialogTitle>
                                      <DialogDescription>
                                        Update product that will be listed.
                                      </DialogDescription>
                                    </DialogHeader>

                                    <ScrollArea className="flex-1 rounded-md border p-4">
                                      <div className="flex flex-col p-1">
                                        <div className="flex flex-col mb-3">
                                          <Label
                                            htmlFor="name"
                                            className="text-left mb-2"
                                          >
                                            Product Name
                                          </Label>
                                          <Input
                                            id="name"
                                            placeholder="Enter product name"
                                            className="col-span-3"
                                            value={productName}
                                            onChange={(e) =>
                                              setProductName(e.target.value)
                                            }
                                          />
                                          {error && !productName && (
                                            <Label className="text-rose-400 text-left mt-1 ml-1">
                                              Field required.
                                            </Label>
                                          )}
                                        </div>

                                        <div className="flex flex-col pb-3">
                                          {selectedImages.length > 0 ? (
                                            <>
                                              <Label
                                                htmlFor="imgPreview"
                                                className="text-left"
                                              >
                                                Product Preview
                                              </Label>
                                              <div className="image-preview flex flex-col items-center m-2">
                                                <Carousel className="w-full max-w-xs items-center">
                                                  <CarouselContent className="flex items-center">
                                                    {selectedImages.map(
                                                      (imageSrc, index) => (
                                                        <CarouselItem
                                                          key={index}
                                                        >
                                                          <div className="p-1">
                                                            <Card>
                                                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                                                <img
                                                                  className="w-[90%]"
                                                                  src={imageSrc}
                                                                  alt={`Selected ${
                                                                    index + 1
                                                                  }`}
                                                                />
                                                              </CardContent>
                                                            </Card>
                                                          </div>
                                                        </CarouselItem>
                                                      )
                                                    )}
                                                  </CarouselContent>
                                                  <CarouselPrevious />
                                                  <CarouselNext />
                                                </Carousel>
                                              </div>
                                            </>
                                          ) : productItem.urls.length > 0 ? (
                                            <>
                                              <Label
                                                htmlFor="imgPreview"
                                                className="text-left"
                                              >
                                                Product Preview
                                              </Label>
                                              <div className="image-preview flex flex-col items-center m-2">
                                                <Carousel className="w-full max-w-xs items-center">
                                                  <CarouselContent className="flex items-center">
                                                    {productItem.urls.map(
                                                      (imageSrc, index) => (
                                                        <CarouselItem
                                                          key={index}
                                                        >
                                                          <div className="p-1">
                                                            <Card>
                                                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                                                <img
                                                                  className="w-[90%]"
                                                                  src={
                                                                    imageSrc.url
                                                                  }
                                                                  alt={`Selected ${
                                                                    index + 1
                                                                  }`}
                                                                />
                                                              </CardContent>
                                                            </Card>
                                                          </div>
                                                        </CarouselItem>
                                                      )
                                                    )}
                                                  </CarouselContent>
                                                  <CarouselPrevious />
                                                  <CarouselNext />
                                                </Carousel>
                                              </div>
                                            </>
                                          ) : (
                                            <></>
                                          )}

                                          <Label
                                            htmlFor="picture"
                                            className="mb-2"
                                          >
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
                                        </div>

                                        <div className="flex flex-col pb-3">
                                          <Label
                                            htmlFor="name"
                                            className="text-left mb-2"
                                          >
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
                                            onChange={(e) =>
                                              setUnitPrice(e.target.value)
                                            }
                                          />
                                          {error && !unitPrice && (
                                            <Label className="text-rose-400 text-left mt-1 ml-1">
                                              Field required.
                                            </Label>
                                          )}
                                        </div>

                                        <div className="flex flex-col pb-3">
                                          <Label
                                            htmlFor="name"
                                            className="text-left mb-2"
                                          >
                                            Product Stock
                                          </Label>
                                          <Input
                                            id="name"
                                            placeholder="0"
                                            type="number"
                                            min="0"
                                            className="col-span-3"
                                            value={productStock}
                                            onChange={(e) =>
                                              setProductStock(e.target.value)
                                            }
                                          />
                                          {error && !productStock && (
                                            <Label className="text-rose-400 text-left mt-1 ml-1">
                                              Field required.
                                            </Label>
                                          )}
                                        </div>
                                      </div>
                                    </ScrollArea>

                                    <DialogFooter className="edit-footer mt-3">
                                      <Button
                                        type="submit"
                                        onClick={() =>
                                          handleUploadImage(
                                            imageEvent,
                                            productItem._id,
                                            false
                                          )
                                        }
                                      >
                                        {onLoading ? (
                                          <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating
                                          </>
                                        ) : (
                                          <>Update changes</>
                                        )}
                                      </Button>
                                    </DialogFooter>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Product</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    className="flex items-center justify-center"
                                    variant="ghost"
                                  >
                                    <PackageX className="size-5" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Are you sure?</DialogTitle>
                                    <DialogDescription className="py-2">
                                      You are deleting product
                                      <span className="font-semibold text-sm text-[#404040]">
                                        {" " + productItem.name}
                                      </span>
                                      ? This cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                      <div className="flex justify-end w-[100%]">
                                        <Button
                                          variant="destructive"
                                          onClick={() =>
                                            handleDeleteProduct(productItem._id)
                                          }
                                        >
                                          Yes, Delete Product
                                        </Button>
                                      </div>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
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

        {productData.productItems.length > 0 && (
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
                        onClick={() => setCurrentPage(value)}
                      >
                        {value + 1}
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
        )}
      </Card>
    </section>
  );
}
