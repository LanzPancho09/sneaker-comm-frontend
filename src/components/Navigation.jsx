import { Button } from "./ui/button";
import { FaHeart, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

function Navigation(){

    const auth = false;

    return(
    <>
        <nav className="main-background drop-shadow-md w-full h-20 fixed top-0 z-10">
                <div className="nav-container flex items-center justify-between h-full">
                    <div className="nav-logo">
                        <h1 className="font-inter text-white text-4xl font-extrabold">SNKRS</h1>
                    </div>

                    <div className="nav-links">
                        <ul className="flex items-center justify-between">

                            {auth ? 
                                <>
                                    <li className="pr-5 text-white"><FaHeart className="w-5 h-5" /></li>
                                    <li className="pr-5 text-white"><FaCartShopping className="w-5 h-5" /></li>
                                    <li className="pr-5 text-white"><FaUser className="w-5 h-5" /></li>
                                </>
                                
                                :
                                <li>
                                    <Button className="mr-5" variant="outline">Log In</Button>
                                    <Button className="mr-5 bg-neutral-800 hover:bg-neutral-900">Sign In</Button>
                                </li>
                            }

                        </ul>
                    </div>
                </div>
        </nav>
    </>
    );
}

export default Navigation;