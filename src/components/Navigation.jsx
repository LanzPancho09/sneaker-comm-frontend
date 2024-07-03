import { Button } from "./ui/button";
import { FaHeart, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const pathToExlcude = ["/login", "/register", "/my-inventory"];

  //checks if the current URL path name is equal to the pathToExclude,
  //this component will not render.
  for (let i = 0; i < pathToExlcude.length; i++) {
    if (location.pathname === pathToExlcude[i]) {
      return null;
    }
  }

  return (
    <>
      <nav className="main-background drop-shadow-md w-full h-20 fixed top-0 z-20">
        <div className="nav-container flex items-center justify-between h-full">
          <div className="nav-logo">
            <h1
              className="font-inter text-white text-4xl font-extrabold hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              SNKRS
            </h1>
          </div>

          <div className="nav-links">
            <ul className="flex items-center justify-between">
              {auth ? (
                <>
                  <li className="pr-5 text-white">
                    {/* <Link to=>{user.name}</Link> */}
                    <FaHeart className="w-5 h-5" />
                  </li>
                  <li className="pr-5 text-white">
                    <FaCartShopping className="w-5 h-5" />
                  </li>
                  <li className="pr-5 text-white">
                    <FaUser className="w-5 h-5" />
                  </li>
                </>
              ) : (
                <li>
                  <Button
                    variant="outline"
                    className="mr-5"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </Button>
                  <Button
                    className="mr-5 bg-neutral-800 hover:bg-neutral-900"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
