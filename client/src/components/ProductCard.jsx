function ProductCard({ product, onLike, onAddToCart, isLiked }) {
    return (
        <div className="product-card fade-in">
            <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
                loading="lazy"
            />
            <div className="product-content">
                <div className="product-header">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-price">${parseFloat(product.price).toFixed(2)}</div>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-actions">
                    <button
                        className={`like-btn ${isLiked ? 'liked' : ''}`}
                        onClick={() => onLike(product.id)}
                    >
                        {isLiked ? '❤️' : '🤍'} {product.likes}
                    </button>
                    <button
                        className="add-to-cart-btn"
                        onClick={() => onAddToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
