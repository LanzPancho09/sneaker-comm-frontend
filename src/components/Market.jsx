import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IoIosHeartEmpty } from "react-icons/io";

function Market() {
  return (
    <>
      <section className="mx-[5%] mt-32 mb-20">
        <h1 className="font-extrabold text-2xl text-[#404040] mb-5">
          Sample Title: Men’s Wear Accessories and Sneakers
        </h1>

        <div className="content-wrapper flex ">
          <div className="side-nav sticky top-24 flex-none w-[292px] h-[700px] mt-2 p-7 bg-white rounded shadow-[0_0px_30px_5px_rgba(0,0,0,0.05)]">
            <div className="filter-list mb-10">
              <h1 className="font-extrabold text-xl mb-2 text-[#404040]">
                Price
              </h1>

              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  className="flex justify-between items-center space-x-2 mb-2"
                  key={index}
                >
                  <label
                    htmlFor={`terms-${index}`}
                    className="text-sm font-normal leading-none text-[#404040] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    $75 - $150
                  </label>
                  <Checkbox key={`terms-${index}`} />
                </div>
              ))}
            </div>

            <div className="filter-list mb-10">
              <h1 className="font-extrabold text-xl mb-2 text-[#404040]">
                Brand
              </h1>

              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  className="flex justify-between items-center space-x-2 mb-2"
                  key={index}
                >
                  <label
                    htmlFor={`terms-${index}`}
                    className="text-sm font-normal leading-none text-[#404040] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    $75 - $150
                  </label>
                  <Checkbox key={`terms-${index}`} />
                </div>
              ))}
            </div>

            <div className="filter-list mb-10">
              <h1 className="font-extrabold text-xl mb-2 text-[#404040]">
                Sizes
              </h1>

              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  className="flex justify-between items-center space-x-2 mb-2"
                  key={index}
                >
                  <label
                    htmlFor={`terms-${index}`}
                    className="text-sm font-normal leading-none text-[#404040] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    $75 - $150
                  </label>
                  <Checkbox key={`terms-${index}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="product-list flex flex-col flex-1 ml-5">
            <div className="items-list flex flex-wrap flex-1">
              {/* Custom Class Product Card*/}
              {Array.from({ length: 30 }).map((_, index) => (
                <div
                  className="product-card relative flex flex-col items-center flex-col-reverse justify-between w-[240px] h-[330px] m-2 bg-[#FCFCFC] shadow-[0_0px_30px_5px_rgba(0,0,0,0.05)] rounded-sm"
                  key={index}
                >
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
              ))}
            </div>

            <div className="pagination-content flex-none mt-7">
              <Pagination className="justify-start">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
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
        </div>
      </section>
    </>
  );
}

export default Market;
