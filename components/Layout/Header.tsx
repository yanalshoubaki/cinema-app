import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <Navbar
      shouldHideOnScroll
      className=" bg-slate-950 w-full"
      classNames={{
        wrapper: "max-w-full",
      }}
      position="sticky"
    >
      <div className="container">
        <div className="flex flex-row justify-between items-center">
          <NavbarBrand>
            <p className="font-bold text-white">Flix</p>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Link href="/" className="text-white">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/movies" aria-current="page" className="text-white">
                Movies
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/series" className="text-white">
                Series
              </Link>
            </NavbarItem>
          </NavbarContent>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
