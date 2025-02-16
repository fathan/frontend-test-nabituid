const THEME_KEY = "theme";

export const getTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === "light" || theme === "dark") {
      return theme;
    }
  }
  return "light";
};

export const setTheme = (theme: "light" | "dark"): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
};

export const initTheme = (): void => {
  if (typeof window !== "undefined") {
    const theme = getTheme();
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
};

export const isDarkModeEnabled = (): boolean => getTheme() === "dark";
