import { render } from '@testing-library/react';
import AlertIcon from '@/app/components/atoms/AlertIcon';

describe('AlertIcon Component', () => {
  it('renders success icon', () => {
    const { container } = render(<AlertIcon type="success" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveClass('text-white');
  });

  it('renders warning icon', () => {
    const { container } = render(<AlertIcon type="warning" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveClass('text-white');
  });

  it('renders info icon', () => {
    const { container } = render(<AlertIcon type="info" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveClass('text-white');
  });

  it('renders secondary icon', () => {
    const { container } = render(<AlertIcon type="secondary" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveClass('text-white');
  });

  it('renders danger icon', () => {
    const { container } = render(<AlertIcon type="danger" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveClass('text-white');
  });
});
