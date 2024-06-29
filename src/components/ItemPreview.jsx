import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductList from "./ProductList";

function ItemPreview() {
  return (
    <>
      <section className="flex flex-col items-center justify-center pt-32 pb-20 bg-[#FAFAFA]">
        <div className="content-wrapper w-[70%] p-20 bg-white rounded shadow-[0_0px_30px_5px_rgba(0,0,0,0.05)] ">
          <div className="item-title mb-5">
            <h1 className="font-bold text-4xl text-[#404040]">
              Stussy Basic T-shirt White
            </h1>
            <h3 className="font-medium text-2xl text-[#838386]">
              Stussy Basic T-shirt White
            </h3>
          </div>
          <div className="item-info flex ">
            <div className="item-caro flex items-center justify-center flex-1">
              <Carousel className="m-16">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="flex items-center justify-center">
                        <img
                          className="w-full"
                          src="https://images.stockx.com/360/Nike-Air-Force-1-Low-White-07/Images/Nike-Air-Force-1-Low-White-07/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1635275427&h=384&q=57"
                          alt=""
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div className="item-detailed-info flex-1 p-10 ">
              <div className="item-detailed-info-header mb-5">
                <h1 className="font-bold text-4xl text-[#404040]">$450</h1>
                <h3 className="font-medium text-base text-[#838386]">
                  Last Sale
                </h3>
              </div>
              <div className="item-detailed-info-content">
                <div className="component-group mb-2">
                  <h2 className="font-bold text-base text-[#404040]">Size</h2>
                  <div className="size-list">
                    <Select>
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
                  </div>
                </div>

                <div className="component-group mb-10">
                  <h2 className="font-bold text-base text-[#404040]">
                    Quantity
                  </h2>
                  <Input
                    type="number"
                    min="1"
                    placeholder="1"
                    className="w-[180px]"
                  />
                </div>

                <div className="component-group mb-2">
                  <Button
                    variant="outline"
                    className="w-full mb-2 hover:bg-[#37A000] hover:text-white"
                  >
                    Add to cart
                  </Button>
                  <Button className="w-full mb-2 bg-[#404040]">Buy now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-wrapper mt-10 p-20 pt-0 w-[70%] bg-white bg-[#FAFAFA]">
          <ProductList categoryName="Related Items" />
          <ProductList categoryName="" />
        </div>
      </section>
    </>
  );
}

export default ItemPreview;
