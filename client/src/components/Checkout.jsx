function Checkout({ cart, totalPrice, onBackToShop }) {
    return (
        <div className="checkout-container fade-in">
            <div className="checkout-success">
                <div className="success-icon">✅</div>
                <h1>Order Placed Successfully!</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Thank you for your order. Please contact us to complete your purchase.
                </p>

                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <div className="contact-name">Jaya Pandey</div>
                    <div className="contact-number">📞 8881399990</div>
                </div>

                <div className="glass-card" style={{ marginTop: '2rem', textAlign: 'left' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
                    {cart.map(item => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.75rem',
                                paddingBottom: '0.75rem',
                                borderBottom: '1px solid var(--border-color)'
                            }}
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>
                                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            marginTop: '1rem'
                        }}
                    >
                        <span>Total:</span>
                        <span className="total-amount">${totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    className="btn btn-primary"
                    style={{ marginTop: '2rem', padding: '1rem 2rem', fontSize: '1.1rem' }}
                    onClick={onBackToShop}
                >
                    Back to Shop
                </button>
            </div>
        </div >
    );
}

export default Checkout;
