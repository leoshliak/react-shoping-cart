import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import '@testing-library/jest-dom';

// Mock components
vi.mock('../components/Navbar', () => ({
    default: ({ productsQuantity, setIsCart, isActive, setIsActive }) => (
      <div>
        <div 
          className="cart-con" 
          role="button" 
          aria-label="cart"
          onClick={() => setIsCart(prev => !prev)}
        >
          <img src="/shopping-cart-reverse.svg" alt="cart" role="img" />
          <span className="quantity">{productsQuantity}</span>
        </div>
        <div 
          className={`menu-icon ${isActive ? 'active' : ''}`} 
          role="button" 
          aria-label="menu"
          onClick={() => setIsActive(prev => !prev)}
        >
          <span></span>
        </div>
        <nav className={`nav ${isActive ? 'active' : ''}`} role="navigation">
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>About us</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    ),
}));

vi.mock('../components/Cart', () => ({
    default: ({ isCart, setIsCart }) => (
      <div className={`cart-component ${isCart ? 'active' : ''}`}>
        <div className="cart-top">
          <h2>Cart</h2>
          <i 
            className="fa-solid fa-xmark" 
            role="button" 
            aria-label="close"
            onClick={() => setIsCart(false)} // Add click handler
          ></i>
        </div>
      </div>
    ),
  }));

vi.mock('../components/Loading', () => ({
  default: () => <div>Loading</div>,
}));

vi.mock('../pages/Error', () => ({
  default: ({ error }) => <div>Error: {error?.message || 'An error occurred'}</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div>Mock Outlet</div>,
    ScrollRestoration: () => <div>ScrollRestoration</div>,
  };
});

describe('App.jsx', () => {
  let localStorageMock;
  let fetchMock;

  beforeEach(() => {
    // Setup localStorage mock
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });

    // Setup fetch mock
    fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            products: [{ id: 1, title: 'Mock Product', quantity: 1 }],
          }),
      })
    );
    global.fetch = fetchMock;
  });

  it('renders and matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('displays loading state initially', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('fetches products from all categories once', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledTimes(6);
    });

    const categories = [
      'womens-dresses',
      'womens-bags',
      'womens-shoes',
      'mens-shirts',
      'mens-watches',
      'sunglasses',
    ];

    for (const category of categories) {
      expect(fetchMock).toHaveBeenCalledWith(
        `https://dummyjson.com/products/category/${category}?limit=30&skip=0`
      );
    }
  });

  it('should display error on failed fetch', async () => {
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    );
    
    render(<BrowserRouter><App /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
    });
  });

  it('should initialize cart from localStorage', async () => {
    const mockCart = [
      { id: 1, title: 'Test Product', price: 10, quantity: 2 },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCart));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('should handle localStorage errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(consoleSpy).toHaveBeenCalledWith('Error loading cart:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('should update products quantity when cart changes', async () => {
    const mockCart = [
      { id: 1, title: 'Test Product', price: 10, quantity: 2 },
      { id: 2, title: 'Another Product', price: 20, quantity: 1 },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCart));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  it('should handle API errors for individual category fetches', async () => {
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
    });
  });

  /*it('should toggle cart active state', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    await waitFor(() => {
      const cartIcon = screen.getByRole('button', { name: /cart/i });
      fireEvent.click(cartIcon);
      expect(screen.getByTestId('cart')).toHaveClass('active');
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      expect(screen.getByTestId('cart')).not.toHaveClass('active');
    });
    ;})*/
    

  it('should toggle menu active state', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      const menuIcon = screen.getByRole('button', { name: /menu/i });
      fireEvent.click(menuIcon);
      expect(screen.getByRole('navigation')).toHaveClass('active');
      
      fireEvent.click(menuIcon);
      expect(screen.getByRole('navigation')).not.toHaveClass('active');
    });
  });
});

