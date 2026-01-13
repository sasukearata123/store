function Cart({ cart, updateQuantity, removeFromCart, getTotalPrice, onCheckout, onContinueShopping }) {
    if (cart.length === 0) {
        return (
            <div className="cart-container fade-in">
                <h1>Shopping Cart</h1>
                <div className="empty-state">
                    <div className="empty-icon">🛒</div>
                    <p className="empty-text">Your cart is empty</p>
                    <button className="btn btn-primary" onClick={onContinueShopping}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container fade-in">
            <h1>Shopping Cart</h1>
            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img
                            src={item.image_url}
                            alt={item.name}
                            className="cart-item-image"
                        />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <div className="cart-item-price">${parseFloat(item.price).toFixed(2)}</div>
                            <div className="quantity-controls">
                                <button
                                    className="quantity-btn"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    −
                                </button>
                                <span className="quantity-display">{item.quantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="cart-item-actions">
                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-amount">${getTotalPrice().toFixed(2)}</span>
                </div>
                <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                    onClick={onCheckout}
                >
                    Proceed to Checkout
                </button>
                <button
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '1rem' }}
                    onClick={onContinueShopping}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default Cart;
