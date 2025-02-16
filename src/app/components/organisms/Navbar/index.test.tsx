import { render, screen } from '@testing-library/react';
import Navbar from '@/app/components/organisms/Navbar';

describe('Navbar Component', () => {
  it('should render Navbar correctly', () => {
    render(<Navbar />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Verified Member')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument();

    const profileImage = screen.getByAltText('Profile');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src');
  });
});
