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
import { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";

function Market() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      method: "Get",
    });

    if (result.ok) {
      result = await result.json();
      console.log(result);
      setProducts(result);
    }
  };

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
              {products.map((productData, index) => (
                <div
                  className="product-card relative flex flex-col items-center flex-col-reverse w-[240px] h-[330px] m-2 bg-[#FCFCFC] shadow-[0_0px_30px_5px_rgba(0,0,0,0.05)] rounded-sm"
                  key={index}
                >
                  <div className="product-info items-center p-5 w-full h-[130px] bg-white">
                    <h4 className="truncate font-inter font-bold text-base text-[#404040]">
                      {productData.name}
                    </h4>
                    <p className="font-inter font-normal text-sm text-[#AEAEB3]">
                      Lowest Ask
                    </p>
                    <h1 className="font-inter font-bold text-2xl text-[#404040]">
                      ${productData.unit_price}
                    </h1>
                    {/* <div className="product-tag flex items-center justify-center p-1 mt-1 max-w-32 rounded-sm bg-[#404040]">
                      <p className="font-inter font-normal text-xs text-white text-center">
                        Last Sale $450
                      </p>
                    </div> */}
                  </div>
                  {/* <div className="product-info items-center p-3 bg-[#FFFFFF] w-full h-[141px] outline">
                    <p>hello</p>
                  </div> */}

                  <div className="flex items-center justify-center flex-1">
                    <img
                      className="scale-75 w-[90%]"
                      src={productData.urls[0].url}
                      alt=""
                    />
                  </div>

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
