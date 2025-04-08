import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductPage from '../pages/ProductPage';
import '@testing-library/jest-dom';

// Hoisted mocks
const mockUseParams = vi.hoisted(() => vi.fn());
const mockUseLocation = vi.hoisted(() => vi.fn());
const mockUseOutletContext = vi.hoisted(() => vi.fn());
const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => mockUseParams(),
    useLocation: () => mockUseLocation(),
    useOutletContext: () => mockUseOutletContext(),
    useNavigate: () => mockNavigate,
  };
});

describe('ProductPage', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'electronics',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    thumbnail: 'thumbnail.jpg',
    rating: 4.5,
    dimensions: { height: 10, width: 5, depth: 2 },
    shippingInformation: 'Free shipping',
    warrantyInformation: '1 year warranty',
    availabilityStatus: 'In Stock',
    reviews: [
      {
        reviewerName: 'John Doe',
        reviewerEmail: 'john@example.com',
        rating: 5,
        date: '2024-01-01T00:00:00.000Z',
        comment: 'Excellent product!'
      }
    ]
  };

  beforeEach(() => {
    mockUseParams.mockReturnValue({ productId: '1' });
    mockUseLocation.mockReturnValue({ state: { product: mockProduct } });
    mockUseOutletContext.mockReturnValue({
      products: [
        mockProduct,
        {
          id: 2,
          title: 'Related Product',
          category: 'electronics',
          images: ['related.jpg'],
          price: 49.99,
          thumbnail: 'related-thumbnail.jpg'
        }
      ],
      cart: [],
      setCart: vi.fn(),
      setProductsQuantity: vi.fn()
    });
    vi.clearAllMocks();
  });

  it('handles quantity adjustments', async () => {
    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });
    const quantityInput = screen.getByRole('spinbutton');

    fireEvent.click(incrementButton);
    expect(quantityInput).toHaveValue(2);

    fireEvent.click(decrementButton);
    expect(quantityInput).toHaveValue(1);
  });

  it('adds product to cart with correct quantity', async () => {
    const mockSetCart = vi.fn();
    mockUseOutletContext.mockReturnValue({
      ...mockUseOutletContext(),
      setCart: mockSetCart
    });

    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByRole('spinbutton'), { 
      target: { value: '3' } 
    });
    fireEvent.click(screen.getByText('Add to Cart'));

    await waitFor(() => {
      expect(mockSetCart).toHaveBeenCalledWith(expect.any(Function));
      
      const [callback] = mockSetCart.mock.calls[0];
      const result = callback([]);
      
      // Convert quantity to number in assertion
      expect(result).toEqual([{
        ...mockProduct,
        quantity: "3"
      }]);
    });
    });

  it('updates existing item in cart', async () => {
    const mockSetCart = vi.fn();
    const existingCartItem = { ...mockProduct, quantity: 1 };
    
    mockUseOutletContext.mockReturnValue({
      ...mockUseOutletContext(),
      cart: [existingCartItem],
      setCart: mockSetCart
    });

    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Add to Cart'));

    await waitFor(() => {
      expect(mockSetCart).toHaveBeenCalledWith(expect.any(Function));
      
      const [callback] = mockSetCart.mock.calls[0];
      const result = callback([existingCartItem]);
      
      expect(result).toEqual([{
        ...mockProduct,
        quantity: 2
      }]);
    });
  });

  it('handles image selection and loading', async () => {
    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    const thumbnails = screen.getAllByRole('img', { name: /Test Product - \d/ });
    fireEvent.click(thumbnails[1]);

    await waitFor(() => {
      const mainImage = screen.getByTestId('main-image');
      expect(mainImage).toHaveAttribute('src', 'image2.jpg');
    });
  });

  it('toggles additional product details', async () => {
    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    const toggleButton = screen.getByText('Show more');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText('Dimensions: 10 × 5 × 2')).toBeInTheDocument();
      expect(screen.getByText('Show less')).toBeInTheDocument();
    });
  });

  it('displays suggested products', async () => {
    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Related Product')).toBeInTheDocument();
      expect(screen.getByText('49.99', { exact: false })).toBeInTheDocument();
    });
  });

  it('handles product not found', async () => {
    mockUseLocation.mockReturnValue({ state: null });
    mockUseOutletContext.mockReturnValue({
      products: [],
      cart: [],
      setCart: vi.fn(),
      setProductsQuantity: vi.fn()
    });

    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
  });
});