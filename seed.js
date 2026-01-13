import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
    {
        name: 'Wireless Headphones',
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        description: 'Premium wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
        price: 129.99
    },
    {
        name: 'Smart Watch',
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        description: 'Feature-rich smartwatch with fitness tracking, heart rate monitoring, and seamless smartphone integration.',
        price: 249.99
    },
    {
        name: 'Laptop Backpack',
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        description: 'Durable and stylish laptop backpack with multiple compartments and water-resistant material.',
        price: 59.99
    },
    {
        name: 'Coffee Maker',
        image_url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
        description: 'Programmable coffee maker with thermal carafe. Brew the perfect cup every morning.',
        price: 89.99
    },
    {
        name: 'Yoga Mat',
        image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
        description: 'Non-slip yoga mat with extra cushioning for comfort during your practice sessions.',
        price: 34.99
    },
    {
        name: 'Desk Lamp',
        image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature settings.',
        price: 45.99
    },
    {
        name: 'Running Shoes',
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        description: 'Lightweight running shoes with superior cushioning and breathable mesh upper.',
        price: 119.99
    },
    {
        name: 'Portable Speaker',
        image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
        description: 'Waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life.',
        price: 79.99
    },
    {
        name: 'Sunglasses',
        image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
        description: 'Polarized sunglasses with UV protection and stylish aviator design.',
        price: 149.99
    },
    {
        name: 'Water Bottle',
        image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
        description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
        price: 29.99
    },
    {
        name: 'Mechanical Keyboard',
        image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
        description: 'RGB mechanical keyboard with customizable switches and premium build quality.',
        price: 159.99
    },
    {
        name: 'Plant Pot Set',
        image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop',
        description: 'Set of 3 ceramic plant pots with drainage holes and saucers. Perfect for indoor plants.',
        price: 39.99
    }
];

async function main() {
    console.log('Starting database seed...');

    // Clear existing products
    await prisma.product.deleteMany({});
    console.log('Cleared existing products');

    // Create new products
    for (const product of sampleProducts) {
        await prisma.product.create({
            data: product
        });
    }

    console.log(`✅ Seeded ${sampleProducts.length} products successfully!`);
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
