const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

app.use(cors())
app.use(express.json())


//create a product

app.post("/products", async (req, res) => {
        try {
            const client = await pool.connect()
            const {image, name, title, description} = req.body;
            const newProduct = await client.query(
                "INSERT INTO products (image, name,  title, description) VALUES($1, $2, $3, $4) RETURNING * ",
                [image, name, title, description]
            );
            res.json(newProduct.rows[0])
        } catch (err) {
            console.log(err.message)
        }
    }
)

//get all products

app.get("/products", async (req, res) => {
    try {
        const client = await pool.connect()
        client.query("SELECT * FROM products").then((allProducts) => {
            res.json(allProducts.rows)
        }).catch((err) => {
            console.error(err.message)
            res.json(err.message);
        });

    } catch (err) {
        console.error(err.message)
        res.json(err.message);
    }
})

//get a product

app.get("/products/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const client = await pool.connect()
        const product = await client.query("SELECT * FROM products WHERE id = $1",
            [id]
        )
        res.json(product.rows[0])
    } catch (err) {
        console.log(req.params)
    }

})

//update product
app.put("/products/:id", async (req, res) => {
    try {
        const client = await pool.connect()
        const {id, image, name, title, description} = req.body.product;
        const updateProduct = await client.query("UPDATE products SET image=$2, name=$3, title=$4, description=$5 WHERE id=$1",
            [id, image, name, title, description]
        );
        res.json(updateProduct)
    } catch (err) {
        console.error(err.message);
        res.json(err);
    }
})

//delete a product

app.delete("/products/:id", async (req, res) => {
    try {
        const client = await pool.connect()
        const id = req.params.id;
        const deleteProduct = await client.query("DELETE FROM products WHERE id = $1",
            [id]
        );
        res.json(deleteProduct)
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(process.env.PORT || 5000, () => {

    console.log("server port 5000")
})