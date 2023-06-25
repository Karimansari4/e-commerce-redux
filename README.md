<h1 align="center">React Dropdown</h1> <br/><br/>

## Ecommerce React app
<p>Create the frontend for an ecommerce website. You can check out the demo link down below.</p>


# Main Features
<ul>
    <li>Navbar.</li>
    <ul>
        <li>Show cart items count</li>
        <li>Show relevant navigation links </li>
    </ul>
    <li>All products page.</li>
    <ul>
        <li>Show list of products from the API (using the fake json-server) </li>
        <li>Each product is editable by clicking on the “pencil”​ button. And we can edit that product inline. On finish editing the product, show some sort of Alert/Notification</li>
        <li>Each product is deletable, on clicking of the delete button it will delete the product and show some sort of Alert/Notification </li>
        <li>Implement a sort button. On clicking it should sort by “price”​ and show a cross button just beside it. On clicking the cross button remove the sort. </li>
    </ul>
    <li>Create page.</li>
    <ul>
        <li>On clicking of the Add button add the product in the DB, and show some sort of Alert/Notification</li>
    </ul>
    <li>Product detail page</li>
    <ul>
        <li>Show all the details of a product</li>
        <li>Give button to add a product to cart</li>
    </ul>
    <li>Cart page</li>
    <ul>
        <li>Show all the items in the cart.</li>
        <li>Delete button to remove the items in the cart</li>
    </ul>
    <li>Handle errors and success alerts etc.</li>
    <li>Handle errors as well from the API and show appropriate Alert/Notification.</li>
</ul>


# HOW TO INSTALL AND SETUP IN YOUR LOCAL PC/LAPTOP React App and Fake Json Server

<h6>Setp 1 -></h6> <p>First goto <a href="https://nodejs.org/en">Node js official website</a> to download node js in your pc/laptop</p>
</h6><p>if already installed than skip it.</p>

<h6>Setp 2 -></h6><p>Clone or download the zip of our project</p>
<a href="https://github.com/Karimansari4/e-commerce-redux.git">Git Repo Link</a>

<h6>Setp 3 -></h6><p>Extract the zip and go to root directory of project</p>

<h6>Setp 4 -></h6><p>Open CMD and type <h6>npm i</h6> it will install all the dependencies</p>

<h6>Setp 5 -></h6><p>Than goto client directory and open cmd</p>

<h6>Setp 6 -></h6><p>Type on cmd json-server db.json --port 4000</p>
<p>To run fake json server on your local PC</p>
<a href="https://www.npmjs.com/package/json-server">Lear more about fake json server</a>

# Note
<p>To perform api request with json server you need to change url of axios request url to http://localhost:4000/products</p>

<h6>Setp 7 -></h6><p>Open one more cmd and type npm start to run react app</p>

<p>It will automatically redirect to Browser in localhost:3000</p>

<p>Project is setedup and runinng on localhost:3000/</p>

<h3>Demo Link -> <a href="https://648ae1760f696a00856adb07--monumental-maamoul-cb4a5d.netlify.app/">Click here</a></h3>