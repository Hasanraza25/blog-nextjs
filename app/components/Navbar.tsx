import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <>
      <nav className="w-full relative flex items-center justify-between px-10 py-5 max-w-[1500px] mx-auto">
        <Link href={"/"} className="text-3xl font-extrabold tracking-wide`">
          Hasan<span className="text-primary">Raza</span>
        </Link>
        <ModeToggle />
      </nav>
    </>
  );
};

export default Navbar;
