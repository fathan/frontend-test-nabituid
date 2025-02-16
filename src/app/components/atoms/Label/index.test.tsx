import { render } from '@testing-library/react';
import Label from '@/app/components/atoms/Label';

describe('Label Component', () => {
  it('renders the label text correctly', () => {
    const labelText = 'Username';
    const { getByText } = render(<Label htmlFor="username">{labelText}</Label>);

    const labelElement = getByText(labelText);
    expect(labelElement).toBeInTheDocument();
  });

  it('shows the required asterisk when required prop is true', () => {
    const { getByText } = render(<Label htmlFor="username" required>Username</Label>);

    const asterisk = getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-red-500');
  });

  it('does not show the required asterisk when required prop is false', () => {
    const { queryByText } = render(<Label htmlFor="username">Username</Label>);

    const asterisk = queryByText('*');
    expect(asterisk).toBeNull();
  });
});
