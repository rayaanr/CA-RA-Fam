import React from "react";
import { Navbar, NavbarBrand, NavbarContent, Button } from "@nextui-org/react";

import "@theme-toggles/react/css/Classic.css";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function TopNav() {
    return (
        <Navbar maxWidth="full">
            <NavbarBrand>
                {/* <BrandLogo /> */}
                <p className="font-bold text-inherit">FamLine</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {/* Center items goes here */}
            </NavbarContent>
            <NavbarContent justify="end">
                <ThemeSwitcher />
            </NavbarContent>
        </Navbar>
    );
}