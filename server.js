import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://store-sasukearata123s-projects.vercel.app',
        /\.vercel\.app$/  // Allow all Vercel preview deployments
    ],
    credentials: true
}));
app.use(express.json());

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Like a product
app.patch('/api/products/:id/like', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                likes: { increment: 1 }
            }
        });
        res.json(product);
    } catch (error) {
        console.error('Error liking product:', error);
        res.status(500).json({ error: 'Failed to like product' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
