// # CRUD Exercise

// You are tasked with creating a RESTful API using Node.js, Express, and MongoDB to perform CRUD (Create, Read, Update, Delete) operations on a database.

// The API should have the following endpoints:

// ### **GET /items**

// - Returns a list of all items in the database.
// - Response status code: 200 OK.
// - Response body: an array of item objects.

// ### **GET /items/:id**

// - Returns the details of a specific item by ID.
// - If the item is not found, return 404 Not Found.
// - Response status code: 200 OK if the item is found, 404 Not Found if not.
// - Response body: a single item object.

// ### **POST /items**

// - Creates a new item in the database.
// - Request body: a JSON object representing the new item.
// - Response status code: 201 Created.
// - Response body: the newly created item object.

// ### **PUT /items/:id**

// - Updates an existing item in the database.
// - If the item is not found, return 404 Not Found.
// - Request body: a JSON object representing the updated item.
// - Response status code: 200 OK if the item is updated successfully, 404 Not Found if not.
// - Response body: the updated item object.

// ### **DELETE /items/:id**

// - Deletes an item from the database.
// - If the item is not found, return 404 Not Found.
// - Response status code: 204 No Content if the item is deleted successfully, 404 Not Found if not.
// - Response body: None.

// Each item object should have the following properties:

// - id: a unique identifier for the item.
// - name: the name of the item.
// - description: a description of the item.
// - price: the price of the item.

// You should also implement error handling and validation for each endpoint, returning appropriate error responses when necessary.

import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockProducts = [
    { id: 1, name: "Laptop", description: "A high-performance laptop", price: 999.99 },
    { id: 2, name: "Smartphone", description: "A latest model smartphone", price: 699.99 },
    { id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: 199.99 },
];

app.get("/api/products", (req, res) => {
    res.send(mockProducts);
});

app.get("/api/products/:id", (req, res) => {
    const {id} = req.params;
    const findProduct = mockProducts.find(p => p.id === parseInt(id));

    if(!findProduct) {
        return res.status(404).json({message: "Product not found"})
    }

    res.json(findProduct)
})

app.post("/api/products", (req, res) => {
    const {name, description, price } = req.body;
    if(!name || !description || !price) {
        return res.status(400).json({message: "All fields required"})
    }

    const newProduct = {
        id: mockProducts.length + 1,
        name,
        description,
        price
    };

    mockProducts.push(newProduct)
    res.status(201).json(newProduct)
})

app.put("/api/products/:id", (req, res) => {
    const {id} = req.params
    const {name, description, price} = req.body
    const index = mockProducts.findIndex(p => p.id === parseInt(id))

    if(index = -1){
        return res.status(404).json({message: "Item not found"})
    }

    mockProducts[index] = {
        id: Number(id),
        name,
        description,
        price
    };

    res.json(mockProducts[index])
})

app.delete("/api/products/:id", (req, res) => {
    const {id} = req.params
    const index = mockProducts.findIndex(p => p.id === parseInt(id))

    if(index === -1){
        return res.status(404).json({message: "Product not found"})
    }

    mockProducts.splice(index, 1)

    res.status(200).send()
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});