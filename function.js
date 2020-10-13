var fs = require("fs");
var isExist = function (id ,items){
    for (let i = 0; i < items.length; i++) {
        if(items[i].id){
            let str_id = id.toString();
            let str_id_1 = items[i].id.toString();
            if(str_id_1 == str_id){
                return i ;
            }
        }
    }
    return -1 ; //not exist
}  
var saveFile = function (data , res){
    let fullPath = data.file ;
    var filename = fullPath.replace(/^.*[\\\/]/, '')
    var folder = fullPath.replace(filename,'');
    buildFolder(__dirname + folder);
    fs.writeFile(__dirname + data.file + ".json", data.content, (err) => {
        if (err) throw err;
        if(res){
           res.json({ "status":true,"message": data.message });
        }else{
           return true ;
        }        
    });
    return false ;
}

var buildFolder = function (dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }else
    {
        console.log("Directory already exist");
    }
    return dir ;
}
module.exports = { isExist,buildFolder,saveFile}; 