const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files directly from this backend server
app.use(express.static(__dirname));

// 1. Array Data Structure: Simulation of Database State
// To simulate backend updates, you can manually add objects or change values here!
let products = [
    { id: "101", name: "Standard Backpack", price: 40, stock: 8 },
    { id: "102", name: "Premium Backpack", price: 40, stock: 4 }, // Identical price to test sorting
    { id: "103", name: "Ergonomic Office Chair", price: 150, stock: 2 },
    { id: "104", name: "Wireless Earbuds", price: 25, stock: 15 }
];

// 2. Set & Object Data Structures for Security and Session State
let validTokens = new Set();
let activeQuestions = {}; // Stores { 'user-session': correctAnswer }

// Route A: Fetch Products with Server-Side Sorting
app.get('/api/products', (req, res) => {
    let sortedProducts = [...products];
    const { sortBy } = req.query;

    if (sortBy === 'price-asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    res.json(sortedProducts);
});

// Route B: Generate Random Math Problem on Backend
app.get('/api/math-question', (req, res) => {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    const operators = ['+', '-', '*'];
    const selectedOp = operators[Math.floor(Math.random() * operators.length)];
    
    let correctAnswer;
    if (selectedOp === '+') correctAnswer = num1 + num2;
    if (selectedOp === '-') correctAnswer = num1 - num2;
    if (selectedOp === '*') correctAnswer = num1 * num2;

    activeQuestions['user-session'] = correctAnswer; 

    res.json({ question: `Solve: ${num1} ${selectedOp} ${num2} = ?` });
});

// Route C: Validate Answer and Issue Secure Token
app.post('/api/verify', (req, res) => {
    const { userAnswer } = req.body;
    const actualAnswer = activeQuestions['user-session'];

    if (parseInt(userAnswer) === actualAnswer) {
        const token = 'tkn_' + Math.random().toString(36).substr(2, 9);
        validTokens.add(token); 
        res.json({ success: true, token });
    } else {
        res.status(400).json({ success: false, message: "Incorrect answer. Try again!" });
    }
});

// Route D: Process Purchase (Reduces Stock & Consumes Token)
app.post('/api/buy', (req, res) => {
    const { productId, token } = req.body;

    if (!token || !validTokens.has(token)) {
        return res.status(401).json({ message: "Access Denied: Invalid or missing transaction token!" });
    }

    const product = products.find(p => p.id === productId);

    if (!product) return res.status(404).json({ message: "Product not found." });
    if (product.stock <= 0) return res.status(400).json({ message: "Item is completely out of stock!" });

    product.stock -= 1;     
    validTokens.delete(token); // Single-use token logic

    res.json({ success: true, message: `Successfully purchased ${product.name}!`, updatedProducts: products });
});

app.listen(PORT, () => console.log(`[Backend Running] http://localhost:${PORT}`));