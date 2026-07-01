# Shopping-cart-Web-dev-project-
this is a simple demonstration of a web development project which uses random access memory.
# Shopping Centre - Backend Security Token Engine

A lightweight, full-stack E-commerce application featuring dynamic product listing, server-side sorting, a shopping basket simulation, and a math-challenge-based backend token security engine[cite: 2, 3, 6].

## 🚀 Project Overview

This project demonstrates a secure checkout workflow[cite: 2, 6]. Before a user can confirm a purchase, they must request a dynamically generated math problem from the backend, submit the correct answer, and receive a single-use transaction token[cite: 2, 3, 6]. This token is verified and consumed during checkout to prevent duplicate or unauthorized transactions.

---

## 🛠️ Tech Stack & File Structure

The project structure consists of the following primary files:

*   **`index.html`**: The frontend user interface styled with Tailwind CSS[cite: 3]. Handles API calls to render products, manage the shopping basket, and interact with the token engine[cite: 3].
*   **`server.js`** (or your main backend file): The Express Node.js backend server handling product APIs, random math problem generation, verification, and transactional security logic[cite: 2, 4].
*   **`package.json`**: Standard Node project manifest file outlining dependency definitions like `express` and `cors`[cite: 4, 5].

---

## 📦 Data Structures Implemented

This project showcases practical usage of essential data structures to handle state management and transactional security[cite: 6]:

1.  **Array**: Simulates the primary database layer, keeping track of product entries (`ID`, `Name`, `Price`, `Stock`)[cite: 2, 6]. Enables server-side sorting algorithms based on query params (`price-asc` or `price-desc`)[cite: 2, 6].
2.  **Object**: Manages single entity states, such as the actively selected items within the frontend client-side checkout basket[cite: 3, 6].
3.  **Set**: Utilized for security token storage[cite: 2, 6]. The unique value constraint of a `Set` makes it ideal for verifying valid transaction keys and executing single-use consumption logic upon purchase completion[cite: 2, 6].
4.  **Key-Value Map (Object)**: Tracks ongoing user session verification problems (`activeQuestions`), caching the correct answers on the backend before validation[cite: 2, 6].

---

## ⚡ Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Run

1. Clone this repository to your local system.
2. Open your terminal in the project directory and install the necessary dependencies[cite: 4, 5]:
   ```bash
   npm install
