import ProductList from "./ProductList";

import { Button } from "@/components/ui/button";

function Landing() {
  return (
    <>
      <section className="main-background w-full h-[900px]">
        <div className="relative content-wrapper nav-container flex items-center justify-between h-full">
          <div className="flex-col">
            <h1 className="font-inter font-[800] text-8xl [color:#101010] [-webkit-text-stroke:1px_#FFFFFF]">
              NIKE
            </h1>
            <h1 className="font-inter font-[800] text-8xl text-white">
              AIR FORCE 1's
            </h1>
            <h1 className="font-inter font-[800] text-8xl text-[#ED0121]">
              SUPREME
            </h1>
          </div>
          <div>
            <img
              className="absolute top-1/2 transform -translate-y-1/2 right-0"
              src="https://www.truetosole.hu/cdn/shop/products/CU9225-100_2_7e24d43c-1374-48dd-93f1-163bf1039ace_720x432.png?v=1584225042"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="nav-container mb-10">
        <div className="my-20 flex items-center">
          <h1 className="ml-auto font-inter font-[900] text-8xl text-[#101010]">
            New Arrivals
          </h1>
        </div>

        {/* <div className="product-wrapper flex flex-col">
                <h4 className="mb-2 font-inter font-[600] text-base ">Category</h4>

                <div className="product-list flex flex-col">
                    <div className="product-cards">
                        <div className="product-card flex flex-col items-center flex-col-reverse w-[240px] h-[330px] bg-[#FCFCFC] shadow-[0_0px_30px_5px_rgba(0,0,0,0.05)] rounded-sm">
                            <div className="product-info items-center p-3 bg-[#FFFFFF] w-full h-[141px]">
                                <h4 className="font-inter font-bold text-base text-[#404040]">Stussy Basic T-shirt White</h4>
                                <p className="font-inter font-normal text-sm text-slate-400">Lowest Ask</p>
                                <h1 className="font-inter font-bold text-2xl text-[#404040]">$45</h1>
                                <div className="product-tag p-1 max-w-32 rounded-sm bg-[#404040]">
                                    <p className="font-inter font-normal text-xs text-white text-center">Last Sale $450</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        <ProductList />
        <ProductList />

        <div className="ad-banner my-10 relative w-full h-[520px] p-20 flex items-center justify-between bg-[#F8F8F8] shadow-lg">
          <div className="hero-title z-10">
            <h2 className="font-bold text-5xl text-[#404040]">
              Nike Air Jordan Low 1
            </h2>
            <h1 className="font-black text-6xl text-[#514539]">
              Reverse Mocha
            </h1>
            <Button
              className="h-[60px] w-[230px] m-2 font-bold text-sm text-[#514539] outline outline-2 outline-[#514539] hover:text-white hover:bg-[#514539]"
              variant="outline"
            >
              BUY NOW $99
            </Button>
          </div>
          <img
            className="absolute top-1/2 transform -translate-y-1/2 right-10 max-w-lg max-h-lg w-auto h-auto"
            src="https://pimpkicks.com.ph/cdn/shop/products/Jordan1RetroLowOGSPTravisScottReverseMochaMen_s.png?v=1658806643"
            alt=""
          />
        </div>

        <ProductList />
        <ProductList />
      </section>
    </>
  );
}

export default Landing;
