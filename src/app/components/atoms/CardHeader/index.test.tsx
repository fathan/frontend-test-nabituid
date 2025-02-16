import { render } from '@testing-library/react';
import CardHeader from '@/app/components/atoms/CardHeader';

describe('CardHeader Component', () => {
  it('renders the title correctly', () => {
    const title = "Card Title";
    const { getByText } = render(<CardHeader title={title} />);
    
    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H2");
    expect(titleElement).toHaveTextContent(title);
  });

  it('applies correct classes for styling', () => {
    const { container } = render(<CardHeader title="Card Title" />);

    const cardHeaderDiv = container.querySelector('div');
    expect(cardHeaderDiv).toHaveClass('border-b', 'border-gray-300', 'py-3', 'px-5');

    const h2Element = container.querySelector('h2');
    expect(h2Element).toHaveClass('text-lg', 'font-semibold');
  });
});
