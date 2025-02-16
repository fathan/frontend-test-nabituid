import { render, screen, fireEvent } from '@testing-library/react';
import ToggleSwitch from '@/app/components/atoms/ToggleSwitch';
import { setTheme, isDarkModeEnabled } from '@/app/utils/themeStorage';

jest.mock('./../../../utils/themeStorage', () => ({
  setTheme: jest.fn(),
  isDarkModeEnabled: jest.fn(),
}));

describe('ToggleSwitch Component', () => {
  it('should toggle the theme and call setTheme on user interaction', () => {
    (isDarkModeEnabled as jest.Mock).mockReturnValue(true);

    render(<ToggleSwitch />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(setTheme).toHaveBeenCalledWith('light');

    fireEvent.click(checkbox);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});
