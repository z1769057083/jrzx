//导入 express 模块
const express = require("express");
//实例化 express
const app = express();
//系统模块 路径模块
const path = require("path");
//引入 swig 模块
const Swig = require('swig');
//导入 request 模块 http 请求模块插件
const request = require('request');
Swig.setDefaults({
	cache : false //不缓存文件
});

//声明 get 请求，路由是 /
app.get("/",function(req,res){
//	res.send(); // 输出 json 或者 字符串
	res.render("index");   // render 加载一个文件 并输出到浏览器
});
app.get("/movie.html",function(req,res){
//	res.send(); // 输出 json 或者 字符串
	res.render("movie");   // render 加载一个文件 并输出到浏览器
});
app.get("/index.html",function(req,res){
//	res.send(); // 输出 json 或者 字符串
	res.render("index");   // render 加载一个文件 并输出到浏览器
});
app.get("/register.html",function(req,res){
//	res.send(); // 输出 json 或者 字符串
	res.render("register");   // render 加载一个文件 并输出到浏览器
});
app.get("/login.html",function(req,res){
//	res.send(); // 输出 json 或者 字符串
	res.render("login");   // render 加载一个文件 并输出到浏览器
});
app.get("/success.html",function(req,res){
//	res.send(); // 输出 json 或者 字符串
	res.render("success");   // render 加载一个文件 并输出到浏览器
});
// 设置文件后缀的解释器  配置 render 输出的文件的解释，编译模块
app.engine('html', Swig.renderFile);
//设置 页面的后缀  配置 render 输出文件的默认后缀
app.set('view engine', 'html');
//设置 页面的 跟目录  配置 render 输出文件的 根目录
app.set("views",path.join(__dirname,"../views"));

// __dirname 系统变量，当前文件路径 （两个下划线）
//把一个目录当做一个静态文件服务的根目录
//访问的路由是 配置的的路由地址开头的都能访问
//拼接目录地址
app.use("/static",express.static(path.join(__dirname,"../static")));



//监听本机端口号，运行服务
const server = app.listen(3000,function(){
	let host = server.address().address;
  	let port = server.address().port;
  	
	console.log("http:%s:%s",host,port);
});





//术语：路由

// res : response 服务器发送给浏览器的对象
app.route('/api/audio').get(function(req, res){
	//接收js使用ajax发送的数据
	var query = req.query;
	console.log(query.type);
	var url = query.url;
	delete query.url;

	request.post({
		url: url,
		formData:req.query
	},function(error,response,data){
		res.send(data);
	});
	
});
//开启静态服务器，把制定的目录作为跟目录 
app.use(express.static("./dest"));
//	res.send("hello world");
//	res.send({
//		"data":[1,2,3,4]
//	})
//});
//	创建一个http请求
/*var server  = require('http').createServer(app);
server.listen(9010, "0.0.0.0", function() {
	console.log('http://127.0.0.1:9010');
});*/
