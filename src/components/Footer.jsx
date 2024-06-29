import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  const pathToExlcude = ["/login", "/register"];

  //checks if the current URL path name is equal to the pathToExclude,
  //this component will not render.
  for (let i = 0; i < pathToExlcude.length; i++) {
    if (location.pathname === pathToExlcude[i]) {
      return null;
    }
  }

  return (
    <>
      <section className="sec-footer h-96 py-10 bg-[#101010]">
        <div className="links-wrapper nav-container flex justify-start flex-wrap">
          <div className="link-card max-w-60 mr-40">
            <h1 className="mb-10 font-extrabold text-4xl text-white">SNRKS</h1>
            <h4 className="mb-2 font-medium text-base text-white">Follow Us</h4>

            <ul className="flex items-center">
              <li className="pr-2">
                <a href="">
                  <AiFillInstagram className="h-7 w-7 text-white" />
                </a>
              </li>
              <li className="pr-2">
                <a href="">
                  <FaFacebook className="h-7 w-7 text-white" />
                </a>
              </li>
              <li className="pr-2">
                <a href="">
                  <FaXTwitter className="h-7 w-7 text-white" />
                </a>
              </li>
              <li className="pr-2">
                <a href="">
                  <FaYoutube className="h-7 w-7 text-white" />
                </a>
              </li>
            </ul>
          </div>

          <div className="link-card max-w-60 mr-16">
            <h4 className="mb-10 font-bold text-base text-white">About</h4>

            <ul>
              <li>
                <a href="" className="font-normal text-base text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="" className="font-normal text-base text-white">
                  Verification
                </a>
              </li>
              <li>
                <a href="" className="font-normal text-base text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="" className="font-normal text-base text-white">
                  Company
                </a>
              </li>
              <li>
                <a href="" className="font-normal text-base text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="" className="font-normal text-base text-white">
                  Refer a Friend
                </a>
              </li>
            </ul>
          </div>

          <div className="link-card max-w-60">
            <h4 className="mb-10 font-bold text-base text-white">Help</h4>

            <ul>
              <li>
                <a href="" className="font-normal text-base text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="" className="font-normal text-base text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="" className="font-normal text-base text-white">
                  Product Suggestions
                </a>
              </li>
              <li>
                <a href="" className="font-normal text-base text-white">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          <div className="water-mark w-full mt-20 mb-5">
            <h4 className="font-medium text-base text-white text-center w-full">
              Lanz Rafael Pancho 2024.
            </h4>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
