"use strict"

const { Database }  = require('sqlite3').verbose()    //1

const db = new Database('db/Chinook_Sqlite.sqlite')   //2 //(:memory:) became the link to the file (replaced with "db/Chinook...")

var Table = require('cli-table')    //6
// instantiate                      (comment out for Scotts version)
          // var table = new Table({
          //     head: ['InvoiceId', 'Name', 'InvoiceDate', 'BillingCountry']
          //   , colWidths: [20, 20, 20, 20]
          // })
          // var table2 = new Table({
          //     head: ['Name']
          //   , colWidths: [20]
          // })



          // // 1 Provide a query showing Customers (just their full names, customer ID and country) who are not in the US.
          // db.serialize(() => {    //3
          //   db.all(`
          //     SELECT  FirstName || " " || LastName AS Name, 
          //             CustomerId, 
          //             Country 
          //     FROM    Customer
          //     WHERE   Country IS NOT "USA"
          //   `, (err, customers) => {
          //     // console.log("~~~Country IS NOT 'USA'~~~\n",customers)
          //   })


          // // 2 Provide a query only showing the Customers from Brazil.
          // // db.serialize(() => {    //4
          //   db.all(`
          //     SELECT  FirstName || " " || LastName AS Name, 
          //             CustomerId, 
          //             Country 
          //     FROM    Customer
          //     WHERE   Country IS "Brazil"
          //   `, (err, customers) => {
          //     // console.log("~~~Country IS 'Brazil'~~~\n", customers)
          //   })

          // // db.serialize(() => {    //4.1 of 3
          //   // db.all(`
          //   //   SELECT FirstName || ' ' || LastName AS 'Name',
          //   //          CustomerId,
          //   //          Country
          //   //   FROM   Customer
          //   //   WHERE  Country IS 'Brazil'
          //   // `, (err, customers) => {
          //   //   customers.forEach(({ CustomerId, Name, Country }) => {
          //   //     console.log(`${CustomerId}: ${Name} (${Country})`)
          //   //   })

          // // db.serialize(() => {    //4.2 of 3
          //   db.each(`
          //     SELECT FirstName || ' ' || LastName AS Name,
          //            CustomerId,
          //            Country
          //     FROM   Customer
          //     WHERE  Country IS 'Brazil'
          //   `, (err, { CustomerId, Name, Country }) => {
          //     // console.log(`${CustomerId}: ${Name} (${Country})`)
          //   })


          // // 3 Provide a query showing the Invoices of customers who are from Brazil. The resultant table should show the customer's full name, Invoice ID, Date of the invoice and billing country.
          // // db.serialize(() => {    //5    
          //   db.each(`
          //     SELECT FirstName || " " || LastName AS "Name",
          //            InvoiceId,
          //            InvoiceDate,
          //            BillingCountry
          //     FROM   Invoice
          //     JOIN   Customer
          //     ON     Invoice.CustomerId = Customer.CustomerId
          //     WHERE  Country = "Brazil"
          //   `, (err, row) => {
          //     // console.log(row)
          //   })

          // // //6 create table with cli-table / InvoiceId first
          //   db.each(`
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

          //   },()=> console.log(table.toString()))

          // // SCOTTS VERSION
          // // db.all(`
          // //     SELECT FirstName || " " || LastName AS "Name",
          // //            InvoiceId,
          // //            InvoiceDate,
          // //            BillingCountry
          // //     FROM   Invoice
          // //     JOIN   Customer
          // //     ON     Invoice.CustomerId = Customer.CustomerId
          // //     WHERE  Country = "Brazil"
          // //   `, (err, { InvoiceId, Name, InvoiceDate, BillingCountry}) => {
               
          // //     // table is an Array, so you can `push`, `unshift`, `splice` and friends 
          // //     table.push(
          // //         [InvoiceId, Name, InvoiceDate, BillingCountry]
          // //     )

          // // // instantiate 
          // //     const head = ['InvoiceId', 'Name', 'InvoiceDate', 'BillingCountry']
          // //     var table = new Table({ head, style : { compact : true } })

          // //   },()=> console.log(table.toString()))



          // // 4 Provide a query showing only the Employees who are Sales Agents.
          // // // db.serialize(() => {    //7  
          //   db.each(`
          //     SELECT FirstName || " " || LastName AS "Name"
          //     FROM   Employee
          //     WHERE  Employee.Title = "Sales Support Agent"
          //   `, (err, emp) => table2.push([emp.Name])

          //   // table is an Array, so you can `push`, `unshift`, `splice` and friends 

          //   ,()=> console.log(table2.toString()))

          // ///////////////////////////  SWANNS WAY  ///////////////////////////
          // const table2S = new Table({ head: ["NAME"], style: {compact: true} });
          //   db.each(`SELECT FirstName || ' ' || LastName AS Name
          //            FROM Employee
          //            WHERE Employee.Title = "Sales Support Agent"
          //            `, (err, emp) => {
          //              table2S.push(emp)
          //            }, () => console.log(table2S.toString()))
          // ///////////////////////////  /  ///////////////////////////
          // })
          // db.close()


// /////////////////////////////////  USING KNEX  /////////////////////////////////
// // const knex = require("knex")({    //DAY2-2
// //   client: "sqlite3",
// //   connection: {
// //     filename: "db/Chinook_Sqlite.sqlite"
// //   },
// //   useNullAsDefault: true, 
// // })

// console.log('5. Provide a query showing a unique list of billing countries from the Invoice table.')  //DAY2-1
// // // SELECT UNIQUE(country) FROM Invoice
// // // console.log("\n", knex.select('*').from('Invoice').then(console.log))

// // // knex.select('*').from('Invoice').then(console.log)
// // // knex('Invoice').select('*').then(console.log) //alternative to above
// // // knex('Invoice').select().then(console.log)    //"*" is the default
// // // knex('Invoice').distinct("BillingCountry").then(console.log)         // then sort below with .orderBy
// // knex('Invoice').distinct('BillingCountry').orderBy('BillingCountry').then(console.log)


// console.log('6. Provide a query showing the invoices of customers who are from Brazil.')
// // // SELECT * FROM INVOICES WHERE BILLINGINGCOUNTRY = BRAZIL
// // knex('Invoice').where('BillingCountry', 'Brazil').then(console.log)


// console.log(`7. Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agent's full name.`)
// //     // SELECT Employee.FirstName || " " || Employee.LastName AS EmpFullName, Customer.FirstName || " " || Customer.LastName AS CustFullName, Invoice.* FROM Invoice
// //     // JOIN Customer ON Invoice.CustomerId = Customer.CustomerId
// //     // JOIN Employee ON Customer.SupportRepId = Employee.EmployeeId
// //     // ORDER BY EmpFullName, Customer.CustomerId;

// // knex.from('Invoice')
// //   .select(knex.raw(`
// //     Employee.FirstName || ' ' || Employee.LastName as SalesAgent,
// //     Invoice.*
// //   `))
// //   .innerJoin('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
// //   .innerJoin('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
// //   // .orderBy('name', 'desc')   ???
// //   .then(console.log)


// console.log(`8. Provide a query that shows the Invoice Total, Customer name, Country and Full Sales Agent name for all invoices and customers.`)
// // CUSTOMER FULL NAME + SALES AGENT FULL NAME + COUNTRY + SUM(INVOICE TOTAL)
//     // SELECT Customer.FirstName || " " || Customer.LastName AS CustFullName, Employee.FirstName || " " || Employee.LastName AS EmpFullName, Invoice.*, Customer.Country, Customer.CustomerId, SUM(Invoice.Total) AS Total FROM Invoice
//     // JOIN Customer ON Invoice.CustomerId = Customer.CustomerId
//     // JOIN Employee ON Customer.SupportRepId = Employee.EmployeeId
//     // GROUP BY Customer.CustomerId

// knex.from('Invoice')
//   .select(knex.raw(`
//     Customer.FirstName || " " || Customer.LastName AS CustFullName, Employee.FirstName || " " || Employee.LastName AS EmpFullName,
//     Invoice.*
//   `))
//   .select('Customer.Country')
//   .sum('Invoice.Total as Total')
//   .innerJoin('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//   .innerJoin('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
//   .groupBy('Customer.CustomerId')
//   .orderBy('Total', 'desc')
//   .then(console.log)

// knex('Invoice')
//       // .select(knex.raw(`Employee.FirstName || ' ' || Employee.LastName as SalesAgent`))
//       // .select(knex.raw(`Customer.FirstName || ' ' || Customer.LastName as Customer`))
//   // .select('Customer.Country')
//   // .sum('Invoice.Total as Total')
//       // .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//       // .join('Employee', 'SupportRepId', 'EmployeeId')
//       // .groupBy('Customer.CustomerId')
//   // .orderBy('Total', 'desc')
//   .then(console.log)

// knex.destroy()




////////////////////////////////////  ////  ////////////////////////////////////
///////////////////////////  Switch to Postgress/PG  ///////////////////////////
const knex = require('knex')({    //DAY2-3
  client: 'pg',
  connection: 'postgres://localhost:5432/chinook',
})

// console.log('5. Provide a query showing a unique list of billing countries from the Invoice table.')
// knex('Invoice').distinct('BillingCountry').orderBy('BillingCountry').then(console.log)

    // console.log('5. Provide a query showing a unique list of billing countries from the Invoice table.')  //DAY2-1
    // // SELECT UNIQUE(country) FROM Invoice
    // // console.log("\n", knex.select('*').from('Invoice').then(console.log))

    // // knex.select('*').from('Invoice').then(console.log)
    // // knex('Invoice').select('*').then(console.log) //alternative to above
    // // knex('Invoice').select().then(console.log)    //"*" is the default
    // // knex('Invoice').distinct("BillingCountry").then(console.log)         // then sort below with .orderBy
    // knex('Invoice').distinct('BillingCountry').orderBy('BillingCountry').then(console.log)


// console.log('6. Provide a query showing the invoices of customers who are from Canada.')
// knex('Invoice').where('BillingCountry', 'Canada').then(console.log)

    // console.log('6. Provide a query showing the invoices of customers who are from Brazil.')
    // // // SELECT * FROM INVOICES WHERE BILLINGINGCOUNTRY = BRAZIL
    // // knex('Invoice').where('BillingCountry', 'Brazil').then(console.log)


// console.log(`7. Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agent's full name.`)
// knex('Invoice')
//   .select(knex.raw(`"Employee"."FirstName" || ' ' || "Employee"."LastName" as SalesAgent`))
//   .select('Invoice.*')
//   .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//   .join('Employee', 'SupportRepId', 'EmployeeId')
//   .then(console.log)

    // console.log(`7. Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agent's full name.`)
    // //     // SELECT Employee.FirstName || " " || Employee.LastName AS EmpFullName, Customer.FirstName || " " || Customer.LastName AS CustFullName, Invoice.* FROM Invoice
    // //     // JOIN Customer ON Invoice.CustomerId = Customer.CustomerId
    // //     // JOIN Employee ON Customer.SupportRepId = Employee.EmployeeId
    // //     // ORDER BY EmpFullName, Customer.CustomerId;

    // // knex.from('Invoice')
    // //   .select(knex.raw(`
    // //     Employee.FirstName || ' ' || Employee.LastName as SalesAgent,
    // //     Invoice.*
    // //   `))
    // //   .innerJoin('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
    // //   .innerJoin('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
    // //   // .orderBy('name', 'desc')   ???
    // //   .then(console.log)


console.log(`8. Provide a query that shows the Invoice Total, Customer name, Country and Full Sales Agent name for all invoices and customers.`)
// CUSTOMER FULL NAME + SALES AGENT FULL NAME + COUNTRY + SUM(INVOICE TOTAL)
    // SELECT Customer.FirstName || " " || Customer.LastName AS CustFullName, Employee.FirstName || " " || Employee.LastName AS EmpFullName, Invoice.*, Customer.Country, Customer.CustomerId, SUM(Invoice.Total) AS Total FROM Invoice
    // JOIN Customer ON Invoice.CustomerId = Customer.CustomerId
    // JOIN Employee ON Customer.SupportRepId = Employee.EmployeeId
    // GROUP BY Customer.CustomerId

console.log(`8. Provide a query that shows the Invoice Total, Customer name, Country and Full Sales Agent name for all invoices and customers.`)
knex('Invoice')
  .select(knex.raw(`"Employee"."FirstName" || ' ' || "Employee"."LastName" as SalesAgent`))
  .select(knex.raw(`"Customer"."FirstName" || ' ' || "Customer"."LastName" as Customer`))
  .select('Customer.Country')
  .sum('Invoice.Total as Total')
  .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
  .join('Employee', 'SupportRepId', 'EmployeeId')
  .groupBy('Customer.CustomerId', 'Employee.EmployeeId')
  .orderBy('Total', 'desc')
  .then(console.log)

    // knex.from('Invoice')
    //   .select(knex.raw(`
    //     Customer.FirstName || " " || Customer.LastName AS CustFullName, Employee.FirstName || " " || Employee.LastName AS EmpFullName,
    //     Invoice.*
    //   `))
    //   .select('Customer.Country')
    //   .sum('Invoice.Total as Total')
    //   .innerJoin('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
    //   .innerJoin('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
    //   .groupBy('Customer.CustomerId')
    //   .orderBy('Total', 'desc')
    //   .then(console.log)

        // SCOTTS VERSION
        // //       // knex('Invoice')
        // //       // .select(knex.raw(`Employee.FirstName || ' ' || Employee.LastName as SalesAgent`))
        // //       // .select(knex.raw(`Customer.FirstName || ' ' || Customer.LastName as Customer`))
        // //   // .select('Customer.Country')
        // //   // .sum('Invoice.Total as Total')
        // //       // .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
        // //       // .join('Employee', 'SupportRepId', 'EmployeeId')
        // //       // .groupBy('Customer.CustomerId')
        // //   // .orderBy('Total', 'desc')
        // //       // .then(console.log)
// delete this line 

knex.destroy()

