import type { PropsWithChildren } from 'react';

export default function ThemeToggleWrapper({ children }: PropsWithChildren) {
  return <div onClick={toggle}>{children}</div>;
}

function toggle() {
  const toggled = document.documentElement.classList.toggle('dark');

  localStorage.setItem('darkMode', toggled.toString());
}
