import { getTheme, setTheme, initTheme, isDarkModeEnabled } from './themeStorage';

describe('Theme Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.toggle = jest.fn();
  });

  describe('getTheme', () => {
    it('should return "light" by default when no theme is in localStorage', () => {
      expect(getTheme()).toBe("light");
    });

    it('should return "dark" when "dark" is stored in localStorage', () => {
      localStorage.setItem('theme', 'dark');
      expect(getTheme()).toBe("dark");
    });

    it('should return "light" when invalid theme is stored in localStorage', () => {
      localStorage.setItem('theme', 'invalid');
      expect(getTheme()).toBe("light");
    });
  });

  describe('setTheme', () => {
    it('should set the theme to "light" and toggle class correctly', () => {
      setTheme("light");
      expect(localStorage.getItem("theme")).toBe("light");
      expect(document.documentElement.classList.toggle).toHaveBeenCalledWith("dark", false);
    });

    it('should set the theme to "dark" and toggle class correctly', () => {
      setTheme("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
      expect(document.documentElement.classList.toggle).toHaveBeenCalledWith("dark", true);
    });
  });

  describe('initTheme', () => {
    it('should initialize theme and toggle class based on localStorage value', () => {
      localStorage.setItem('theme', 'dark');
      initTheme();
      expect(document.documentElement.classList.toggle).toHaveBeenCalledWith("dark", true);

      localStorage.setItem('theme', 'light');
      initTheme();
      expect(document.documentElement.classList.toggle).toHaveBeenCalledWith("dark", false);
    });
  });

  describe('isDarkModeEnabled', () => {
    it('should return true when the theme is "dark"', () => {
      localStorage.setItem('theme', 'dark');
      expect(isDarkModeEnabled()).toBe(true);
    });

    it('should return false when the theme is "light"', () => {
      localStorage.setItem('theme', 'light');
      expect(isDarkModeEnabled()).toBe(false);
    });

    it('should return false when no theme is set in localStorage', () => {
      expect(isDarkModeEnabled()).toBe(false);
    });
  });
});
