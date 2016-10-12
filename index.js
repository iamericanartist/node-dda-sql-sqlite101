"use strict"

const { Database }  = require('sqlite3').verbose()    //1

const db = new Database('db/Chinook_Sqlite.sqlite')   //2 //(:memory:) became the link to the file (replaced with "db/Chinook...")

var Table = require('cli-table')    //6
// instantiate                      (comment out for Scotts version)
var table = new Table({
    head: ['InvoiceId', 'Name', 'InvoiceDate', 'BillingCountry']
  , colWidths: [20, 20, 20, 20]
})



// 1 Provide a query showing Customers (just their full names, customer ID and country) who are not in the US.
db.serialize(() => {    //3
  db.all(`
    SELECT  FirstName || " " || LastName AS Name, 
            CustomerId, 
            Country 
    FROM    Customer
    WHERE   Country IS NOT "USA"
  `, (err, customers) => {
    console.log("~~~Country IS NOT 'USA'~~~\n",customers)
  })


// 2 Provide a query only showing the Customers from Brazil.
// db.serialize(() => {    //4
  db.all(`
    SELECT  FirstName || " " || LastName AS Name, 
            CustomerId, 
            Country 
    FROM    Customer
    WHERE   Country IS "Brazil"
  `, (err, customers) => {
    console.log("~~~Country IS 'Brazil'~~~\n", customers)
  })

// db.serialize(() => {    //4.1 of 3
  // db.all(`
  //   SELECT FirstName || ' ' || LastName AS 'Name',
  //          CustomerId,
  //          Country
  //   FROM   Customer
  //   WHERE  Country IS 'Brazil'
  // `, (err, customers) => {
  //   customers.forEach(({ CustomerId, Name, Country }) => {
  //     console.log(`${CustomerId}: ${Name} (${Country})`)
  //   })

// db.serialize(() => {    //4.2 of 3
  db.each(`
    SELECT FirstName || ' ' || LastName AS Name,
           CustomerId,
           Country
    FROM   Customer
    WHERE  Country IS 'Brazil'
  `, (err, { CustomerId, Name, Country }) => {
    console.log(`${CustomerId}: ${Name} (${Country})`)
  })


// 3 Provide a query showing the Invoices of customers who are from Brazil. The resultant table should show the customer's full name, Invoice ID, Date of the invoice and billing country.
// db.serialize(() => {    //5    
  db.each(`
    SELECT FirstName || " " || LastName AS "Name",
           InvoiceId,
           InvoiceDate,
           BillingCountry
    FROM   Invoice
    JOIN   Customer
    ON     Invoice.CustomerId = Customer.CustomerId
    WHERE  Country = "Brazil"
  `, (err, row) => {
    console.log(row)
  })

// //6 create table with cli-table / InvoiceId first
  db.each(`
    SELECT FirstName || " " || LastName AS "Name",
           InvoiceId,
           InvoiceDate,
           BillingCountry
    FROM   Invoice
    JOIN   Customer
    ON     Invoice.CustomerId = Customer.CustomerId
    WHERE  Country = "Brazil"
  `, (err, { InvoiceId, Name, InvoiceDate, BillingCountry}) => {
     
    // table is an Array, so you can `push`, `unshift`, `splice` and friends 
    table.push(
        [InvoiceId, Name, InvoiceDate, BillingCountry]
    )

  },()=> console.log(table.toString()))

// SCOTTS VERSION
// db.all(`
//     SELECT FirstName || " " || LastName AS "Name",
//            InvoiceId,
//            InvoiceDate,
//            BillingCountry
//     FROM   Invoice
//     JOIN   Customer
//     ON     Invoice.CustomerId = Customer.CustomerId
//     WHERE  Country = "Brazil"
//   `, (err, { InvoiceId, Name, InvoiceDate, BillingCountry}) => {
     
//     // table is an Array, so you can `push`, `unshift`, `splice` and friends 
//     table.push(
//         [InvoiceId, Name, InvoiceDate, BillingCountry]
//     )

// // instantiate 
//     const head = ['InvoiceId', 'Name', 'InvoiceDate', 'BillingCountry']
//     var table = new Table({ head, style : { compact : true } })

//   },()=> console.log(table.toString()))






})

