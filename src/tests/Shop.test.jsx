import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Shop from '../pages/Shop';
import '@testing-library/jest-dom';

const mockUseOutletContext = vi.hoisted(() => vi.fn());
const mockUseNavigate = vi.hoisted(() => vi.fn());

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: mockUseOutletContext,
    useNavigate: mockUseNavigate,
  };
});

vi.mock('../components/Footer', () => ({
  default: () => <div>Footer</div>
}));

describe('Shop Component', () => {
  beforeEach(() => {
    mockUseOutletContext.mockReturnValue({
      products: [
        { 
          id: 1, 
          title: 'Test Product 1', 
          price: 100,
          category: 'womens-dresses',
          images: ['thumb1.jpg', 'hover1.jpg'],
          description: 'Test description'
        },
        {
          id: 2,
          title: 'Another Product', // Changed to match search test
          price: 200,
          category: 'mens-shirts',
          images: ['thumb2.jpg', 'hover2.jpg'],
          description: 'Another test'
        }
      ],
      cart: [],
      setCart: vi.fn(),
      setProductsQuantity: vi.fn(),
      isActive: false,
      setIsActive: vi.fn()
    });

    mockUseNavigate.mockImplementation(() => vi.fn());
  });

  it('filters products by search query', async () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    const searchInput = screen.getByTestId('search-input');
    // Use lowercase to match component's toLowerCase() filter
    fireEvent.change(searchInput, { target: { value: 'another' } });

    await waitFor(() => {
      expect(screen.getByText('Another Product')).toBeInTheDocument();
      expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows no results message', async () => {
    // Override mock data for this test
    mockUseOutletContext.mockReturnValueOnce({
      products: [],
      cart: [],
      setCart: vi.fn(),
      setProductsQuantity: vi.fn(),
      isActive: false,
      setIsActive: vi.fn()
    });

    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Non-existent' } });

    await waitFor(() => {
      expect(screen.getByText('No products found for "Non-existent"')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});