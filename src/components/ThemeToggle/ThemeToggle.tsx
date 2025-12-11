import type { PropsWithChildren } from "react";

export default function ThemeToggleWrapper({ children }: PropsWithChildren) {
    return <div onClick={toggle}>{children}</div>;
}

function toggle() {
    document.documentElement.classList.add("transitioning");

    setTimeout(() => {
        document.documentElement.classList.remove("transitioning");
    }, 200);

    const toggled = document.documentElement.classList.toggle("dark");

    localStorage.setItem("darkMode", toggled.toString());
}
