import { render } from '@testing-library/react';
import TableHeadCell from '@/app/components/atoms/TableHeadCell';

describe('TableHeadCell Component', () => {
  it('renders the label correctly', () => {
    const { getByText } = render(
      <table>
        <thead>
          <tr>
            <TableHeadCell label="Header" />
          </tr>
        </thead>
      </table>
    );

    expect(getByText('Header')).toBeInTheDocument();
  });

  it('applies the className prop correctly', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHeadCell label="Header" className="bg-gray-200" />
          </tr>
        </thead>
      </table>
    );

    const tableHeadCell = container.querySelector('th');
    expect(tableHeadCell).toHaveClass('bg-gray-200');
    expect(tableHeadCell).toHaveClass('px-4');
    expect(tableHeadCell).toHaveClass('py-4');
    expect(tableHeadCell).toHaveClass('text-left');
  });

  it('renders without a className and applies default classes', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHeadCell label="Header" />
          </tr>
        </thead>
      </table>
    );

    const tableHeadCell = container.querySelector('th');
    expect(tableHeadCell).toHaveClass('px-4');
    expect(tableHeadCell).toHaveClass('py-4');
    expect(tableHeadCell).toHaveClass('text-left');
  });
});
