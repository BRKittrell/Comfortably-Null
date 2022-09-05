require("dotenv").config();
const express = require('express');
const app = express();
const db = require("./connnection-string.js")

const {Pool} = require('pg');
const pool = new Pool({
    user: 'brandonkittrell',
    host: 'localhost',
    port: 5432,
    database: 'ATRs',
});

const PORT = 8015

app.use(express.static("public"))

//Post request -> creates a transaction record.
app.post('/ATRs', async (req, res) => {
    try{
        const {Rank_Rate, First_Name, Last_Name, DODIC, NIIN, Lot_Number,Condition_Code, Transaction_Code, Source_Code, Document_Number, Consignee, Consignor, Transaction_Quantity, Comments} = req.body;
        const {rows} = await pool.query('INSERT INTO ATRs(Rank_Rate, First_Name, Last_Name,DODIC, NIIN, Lot_Number,Condition_Code, Transaction_Code, Source_Code, Document_Number, Consignee, Consignor, Transaction_Quantity, Comments) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;',[Rank_Rate, First_Name, Last_Name,DODIC, NIIN, Lot_Number,Condition_Code, Transaction_Code, Source_Code, Document_Number, Consignee, Consignor, Transaction_Quantity, Comments]);
        res.send(rows)
        res.status(200)
    }catch(err){
        alert("Verify that inputs are correct. See ? for help.")
    }
})

//Get all -> retreives all records from Ammunition_Transactions table.
app.get('/', async (req, res) => {
    try{
        const allTransactions = await pool.query('SELECT * FROM ATRs');
        const rows = allTransactions.rows;
        res.send(rows); 
    } catch (error){
        res.send(err);
        console.log(err);
    }
});

//Get one -> retrieves records for a given value from Ammunition_Transactions table.
app.get('/ATRs/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const rows = await pool.query('SELECT * FROM ATRs WHERE DODIC = $1', [id]);
        res.send(rows)
    }catch (error){
        alert ('Verify NALC input.')
        console.log(err)
}
    });

//Update one -> Updates the condition code for a given Lot Number.
app.patch('/', async (req, res) => {
    try{
        const {Rank_Rate, First_Name, Last_Name, DODIC, NIIN, Lot_Number,Condition_Code, Transaction_Code, Source_Code, Document_Number, Consignee, Consignor, Transaction_Quantity, Comments} = req.body;
        const {rows} = await pool.query('INSERT INTO ATRs(Rank_Rate, First_Name, Last_Name,DODIC, NIIN, Lot_Number,Condition_Code, Transaction_Code, Source_Code, Document_Number, Consignee, Consignor, Transaction_Quantity, Comments) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;',[Rank_Rate, First_Name, Last_Name,DODIC, NIIN, Lot_Number,Condition_Code, Transaction_Code, Source_Code, Document_Number, Consignee, Consignor, Transaction_Quantity, Comments]);
    }catch (error){
        alert('Verify that the lot number is correct.');
        res.send(err);
        console.log(err);
    }
})

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${PORT}`));
