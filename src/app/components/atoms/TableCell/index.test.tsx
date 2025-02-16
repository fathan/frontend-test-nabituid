import { render } from '@testing-library/react';
import TableCell from '@/app/components/atoms/TableCell';

describe('TableCell Component', () => {
  it('renders the children correctly', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Test Content</TableCell>
          </tr>
        </tbody>
      </table>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the className prop correctly', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell className="bg-gray-200">Test Content</TableCell>
          </tr>
        </tbody>
      </table>
    );

    const tableCell = container.querySelector('td');
    expect(tableCell).toHaveClass('bg-gray-200');
    expect(tableCell).toHaveClass('px-4');
    expect(tableCell).toHaveClass('py-4');
    expect(tableCell).toHaveClass('border-b');
  });

  it('renders without a className and applies base classes', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Test Content</TableCell>
          </tr>
        </tbody>
      </table>
    );

    const tableCell = container.querySelector('td');
    expect(tableCell).toHaveClass('px-4');
    expect(tableCell).toHaveClass('py-4');
    expect(tableCell).toHaveClass('border-b');
  });
});