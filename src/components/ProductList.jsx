import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IoIosHeartEmpty } from "react-icons/io";

export function ProductList() {
  return (
    <>
      <h4 className="mb-2 font-inter font-[600] text-base ">Category</h4>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              className="md:basis-1/2 lg:basis-1/4 pl-0"
              key={index}
            >
              <div className="p-1">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {/* Custom Class Product Card*/}
                  <div className="product-card relative flex flex-col items-center flex-col-reverse justify-between w-[240px] h-[330px] bg-[#FCFCFC] shadow-[0_0px_30px_5px_rgba(0,0,0,0.05)] rounded-sm">
                    <div className="product-info items-center p-3 bg-[#FFFFFF] w-full h-[141px]">
                      <h4 className="font-inter font-bold text-base text-[#404040]">
                        Stussy Basic T-shirt White
                      </h4>
                      <p className="font-inter font-normal text-sm text-[#AEAEB3]">
                        Lowest Ask
                      </p>
                      <h1 className="font-inter font-bold text-2xl text-[#404040]">
                        $45
                      </h1>
                      <div className="product-tag p-1 max-w-32 rounded-sm bg-[#404040]">
                        <p className="font-inter font-normal text-xs text-white text-center">
                          Last Sale $450
                        </p>
                      </div>
                    </div>

                    <img
                      className="w-[90%]"
                      src="https://images.stockx.com/360/Nike-Air-Force-1-Low-White-07/Images/Nike-Air-Force-1-Low-White-07/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1635275427&h=384&q=57"
                      alt=""
                    />
                    <li className="absolute top-3 right-3 list-none">
                      <IoIosHeartEmpty className="w-6 h-6 cursor-pointer transition-colors duration-300 hover:fill-red-500" />
                    </li>
                  </div>
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}

export default ProductList;
