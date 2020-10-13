# JSON Server Advanced
This is json server advanced is similar as JSON-SERVER . 
* It is support https://jmespath.org/ to  get data using paramater [YOUR-LINK]?filter=[JMESPATH].
<br/>Example to get item : http://localhost:5000/api/products?filter=[?number==`102`].

* Multiple json files server<br/>

* Create (POST) , udpate(PUT) , delete (DELETE) content in JSON server file<br/>

## How to install 
```
git clone https://github.com/miandry/JSONServerAdvanced.git
cd JSONServerAdvanced 
npm install
npm start  

```

## Generate a new json server

Use method POST request <br/>
EXAMPLE<br/>
http://localhost:5000/router <br/>
json format
{
	"url":"/api/products",
	"label":"Products"
} 
<br/>
<img src="http://miandrilala.com/sites/drupalmada/files/2020-10/Screen%20Shot%202020-10-13%20at%209.24.08%20AM.png" style="max-width:100%" width="550px"/>
## Get items to json server file
Use GET method to get items in file <br/>
<b>SOURCE PATH</b> /api/products.json <br/>
<b>URL EXAMPLE 1 (search by id)</b> http://localhost:5000/api/products?filter=[?id==%27143%27] <br/>
<b>URL EXAMPLE 2 (pagination) </b> http://localhost:5000/api/products?filter=[0:1] 
<br/><a href="https://jmespath.org/tutorial.html"> See more JMESPATH </a>

```
[
	{
		"id":1,
		"title":"PC dell",
		"price":"350 USD"
	},
	{
		"id":2,
		"title":"PC Acer",
		"price":"300 USD"
	}
]
```
## Add Item to json server file

<b>SOURCE PATH</b> /api/products.json <br/>
<b>URL </b> http://localhost:5000/api/products
Use POST method to add item in file , <b>Field id is required</b>
<br/>
<img src="http://miandrilala.com/sites/drupalmada/files/2020-10/Screen%20Shot%202020-10-13%20at%208.48.21%20PM_0.png" width="550px"/>
<br/>
## Update Item to json server file
Use PUT method to add item in file <b>Field id is required</b>
<b>SOURCE PATH</b> /api/products.json <br/>
<b>URL </b> http://localhost:5000/api/products 
<br/>
<img src="http://miandrilala.com/sites/drupalmada/files/2020-10/Screen%20Shot%202020-10-13%20at%209.45.43%20PM.png" width="550px" />
<br/>
## Delete Item to json server file
Use DELETE method to add item in file <b>Field id is required</b>
<b>SOURCE PATH</b> /api/products.json <br/>
<b>URL </b> http://localhost:5000/api/products

