"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Classic
            placeholder="theme-swithcer"
            toggled={theme === "light"}
            toggle={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-3xl"
        />
    );
}