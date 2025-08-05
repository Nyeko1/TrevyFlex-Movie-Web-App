import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import loginImage from "../assets/images/login-icon.png";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/Api";
import {Link} from "react-router-dom"

const NavBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <section className="w-full">
      <Disclosure as="nav" className="flex w-full h-15 bg-[#cae4f9]">
        <div className="w-xl mx-3 relative justify-between  sm:w-full sm:mx-8 flex px-4 xl:px-6 lg:px-8 items-center ">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-black text-md sm:text-xl"
             > TrevyFlex🪶</Link>
          </div>
          {/* Home link */}
          <div>
            <Link to="/">Home</Link>
          </div>
        </div>
      </Disclosure>
    </section>
  );
};

export default NavBar;
