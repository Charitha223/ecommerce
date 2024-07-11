const express=require('express')
const mysql=require('mysql2')
const cors=require('cors')
const app=express()
const db=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'root',
        database:'ecommerce'
    }

)
db.connect (
    function(err) {
        if(err) {
            console.log("connection unsuc");
            console.log(db.sqlmessage);
        }
    else{
        console.log("connection successful");

    }
    }

)
app.get('get-products',function(req,res) {
    const getQUery='SELECT *FROM products'
    db.query(getQUERY,function(err,result) {
        if(err) {
            res.status(500).send({'text':'error in getting data'})
            console.log(err.sqlMessage);
            return;
        }
        else{
            res.json(result);
        }
    })
})
app.post('/add-product',function(req,res) {
    const {product_name,description,mrp,img,category}=req.body;
    const insertQuery='INSERT INTO products(product_name,description,mrp,img,category)VALUES(?,?,?,?,?)';
    db.query(insertQuery,function(err,result){
        if(err){
            console.log(err.sqlMessage);
            res.status(500).send('error inserting the data')
            return;
        }
        res.json({'text':'the product has been inserted sucessfully'})
    })
})
app.listen(8085)