const express = require('express');
const router = express.Router();
const con = require('../connection/db');


router.post('/', (req, res) => {
    const { date, suppliername, location, suppliercontact, productname } = req.body;

    console.log('POST request data:', req.body); 

    con.query('INSERT INTO supplier (date, suppliername, location, suppliercontact, productname) VALUES (?, ?, ?, ?, ?)',
        [date, suppliername, location, suppliercontact, productname],
        (err, results) => {
            if (err) {
                console.error('Error posting data:', err);
                res.status(500).send('Failed to post data');
            } else {
                res.status(201).send('Data successfully posted');
            }
        });
});


router.get('/', (req, res) => {
    con.query('SELECT * FROM supplier', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Failed to fetch data');
        } else {
            console.log('GET all results:', results); 
            res.json(results);
        }
    });
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('GET request ID:', id); 

    con.query('SELECT * FROM supplier WHERE code = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching data by ID:', err);
            res.status(500).send('Failed to retrieve data by ID');
        } else {
            console.log('GET ID results:', results); 
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Data not found');
            }
        }
    });
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('DELETE request ID:', id); 

    con.query('DELETE FROM supplier WHERE code = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).send('Failed to delete data');
        } else {
            console.log('DELETE results:', results); 
            if (results.affectedRows > 0) {
                res.send('Data successfully deleted');
            } else {
                res.status(404).send('Data not found');
            }
        }
    });
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { date, suppliername, location, suppliercontact, productname } = req.body;

    console.log('PUT request data:', req.body); 

    con.query('UPDATE supplier SET suppliername = ?, location = ?, suppliercontact = ?, productname = ? WHERE code = ?',
        [ suppliername, location, suppliercontact, productname, id],
        (err, results) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Failed to update data');
            } else {
                console.log('UPDATE results:', results); 
                if (results.affectedRows > 0) {
                    res.send('Data successfully updated');
                } else {
                    res.status(404).send('Data not found');
                }
            }
        });
});

module.exports = router;
