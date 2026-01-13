import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { API_URL } from './config';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState('products'); // 'products', 'cart', 'checkout'
    const [likedProducts, setLikedProducts] = useState(new Set());

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/api/products/${productId}/like`, {
                method: 'PATCH',
            });
            const updatedProduct = await response.json();

            // Update products list
            setProducts(products.map(p =>
                p.id === productId ? updatedProduct : p
            ));

            // Track liked products
            setLikedProducts(prev => {
                const newSet = new Set(prev);
                newSet.add(productId);
                return newSet;
            });
        } catch (error) {
            console.error('Error liking product:', error);
        }
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const getTotalItems = () => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    };

    const handleCheckout = () => {
        setCurrentView('checkout');
    };

    return (
        <div className="app">
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <a href="#" className="logo" onClick={() => setCurrentView('products')}>
                            ✨ Wall of LifeStyle
                        </a>
                        <nav className="nav">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setCurrentView('products')}
                            >
                                🏠 Shop
                            </button>
                            <button
                                className="btn btn-secondary btn-icon"
                                onClick={() => setCurrentView('cart')}
                            >
                                🛒
                                {getTotalItems() > 0 && (
                                    <span className="cart-badge">{getTotalItems()}</span>
                                )}
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                {currentView === 'products' && (
                    <div className="fade-in">
                        <h1>Discover Amazing Products</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                            Browse our curated collection of premium items
                        </p>

                        {loading ? (
                            <div className="loading pulse">Loading products...</div>
                        ) : products.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📦</div>
                                <p className="empty-text">No products available yet</p>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {products.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onLike={handleLike}
                                        onAddToCart={addToCart}
                                        isLiked={likedProducts.has(product.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {currentView === 'cart' && (
                    <Cart
                        cart={cart}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                        getTotalPrice={getTotalPrice}
                        onCheckout={handleCheckout}
                        onContinueShopping={() => setCurrentView('products')}
                    />
                )}

                {currentView === 'checkout' && (
                    <Checkout
                        cart={cart}
                        totalPrice={getTotalPrice()}
                        onBackToShop={() => {
                            setCart([]);
                            setCurrentView('products');
                        }}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
