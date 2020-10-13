var func = require("./function.js") ;
var express = require('express');
var app = express();
var fs = require("fs");
var cors = require('cors');
var jmespath = require('jmespath');
const bodyParser = require('body-parser');
var routers = require(__dirname + "/" + "router.json");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/restart', function (req, res, next) {
    process.exit(1);
});
app.get("/router", function (req, res) {
    console.log("get request router");
        let data = require(__dirname + '/router.json');
        var query = req.query.filter;
        if (query) {
            data = jmespath.search(data, query);
        }
        var key = req.query.key;
        var fields = req.query.fields;
        if (key && fields) {
            fields = JSON.parse(fields);
            data = mysearch.search(data, fields, key)
        }
        res.set({ 'Access-Control-Allow-Origin': '*' }).json(data);
});
app.post("/router", function (req, res) {
        res.set({ 'Access-Control-Allow-Origin': '*' });
        let currentValue = require(__dirname + '/router.json');    
        console.log("post request route ");
        let data = req.body;
         if(data.url){              
               data['revision'] = 0 ; 
               currentValue.push(data);
               dataNew = JSON.stringify(currentValue);
               var input = {
                "message" : "Success created route",
                "content" : dataNew,
                "file" : "/router"
               };
               var creatFile = {
                "content" : "[]",
                "file" : data.url 
               };
               func.saveFile(creatFile , null);    
               func.saveFile(input , res);    
        }else{
            res.json({ "status":false,"message": "Field URL is required" });
        }
});
routers.forEach(function (value, index, array) {
    value = value.url ;
    /** http://localhost:5000/api/products?filter=[?priceList[0].price==%27295000%27] **/
    /**http://localhost:5000/api/products?key=Tenis&fields=[%22title%22,%22description%22] **/
     app.get(value, function (req, res) { 
        let data = require(__dirname + value + '.json');
       // data = jmespath.search(data,'[reverse(sort_by([], &id))]'); // good
       // console.log(data[0]);
         var query = req.query.filter;
        if (query) {
            data = jmespath.search(data, query);
        }
        var key = req.query.key;
        var field = req.query.field;
        if ( key && field ){
            data = jmespath.search(data,"@[?contains("+field+", '"+key+"') == `true`]");
        }
        res.set({ 'Access-Control-Allow-Origin': '*' }).json(data);
     });
     app.post(value, function (req, res) {
        res.set({ 'Access-Control-Allow-Origin': '*' });
        let currentValue = require(__dirname + value + '.json');      
        console.log("post request ");
        let data = req.body;
        console.log(data);
        if(data.id){         
            let index_value = func.isExist(data.id,currentValue);
            if(index_value > -1){
                res.json({ "status":false,"message": "Id exist already" });
            } else {             
               data['revision'] = 0 ; 
               currentValue.unshift(data);
               dataNew = JSON.stringify(currentValue);
               var input = {
                "message" : "Success created content",
                "content" : dataNew,
                "file" : value
               };
               func.saveFile(input,res);
            }
        }else{
            console.log("Field id is required");
            res.json({ "status":false,"message": "Field id is required" });
        }
 
     });
     app.put(value, function (req, res) {
        let currentValue = require(__dirname + value + '.json');
        console.log("put request ");
        let data = req.body;
        if(data.id){         
            let index_value = func.isExist(data.id,currentValue);
            if(index_value > -1 ){
                var current_data = currentValue[index_value] ;
                data['revision'] = current_data['revision'] + 1 ; 
                currentValue[index_value] = data ;
                dataNew = JSON.stringify(currentValue);
                var input = {
                    "message" : "Success updated content",
                    "content" : dataNew,
                    "file" : value
                };
                func.saveFile(input,res);     
            } else {     
                data['revision'] = 0 ; 
                currentValue.unshift(data);
                dataNew = JSON.stringify(currentValue);
                var input = {
                    "message" : "Success created content",
                    "content" : dataNew,
                    "file" : value
                };
                func.saveFile(input,res);        
              //  res.json({ "status":false,"message": "Id not exist" });
            }
            
        }else{
            console.log("Field id is required");
            res.json({ "status":false,"message": "Field id is required" });
        }
     });
     app.delete(value, function (req, res) {   
        let currentValue = require(__dirname + value + '.json');
        console.log("delete request ");
        let data = req.body;
        if(data.id){         
            let index_value = func.isExist(data.id,currentValue);      
            if(index_value > -1 ){
                currentValue.splice(index_value, 1);
                dataNew = JSON.stringify(currentValue);
                var input = {
                    "message" : "Success deleted content",
                    "content" : dataNew,
                    "file" : value
                };
                func.saveFile(input,res);           
            } else {              
                res.json({ "status":false,"message": "Id not exist" });
            }
        }else{
            console.log("Field id is required");
            res.json({ "status":false,"message": "Field id is required" });
        }
     });
 });
var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().porta
    console.log("Start app listening at http://%s:%s", host, port)
})