# ES6-ES10 语法

## ES6 函数篇

### 函数参数

```js
function f(x,y=7,z=x+y){
	console.log(f.length) //返回函数参数没有默认值的格式 打印：1
	return x*10+z
	console.log(f(1)) //18
}
//Rest操作
function sum(base,...nums){
    let num=0
    nums.forEach(function(item){
        num+=item*1
    })
    return base*2+num  //第一个数*2
}
console.log(sum(1,2,3)) //7

//spread操作
function(x=1,y=2,z=3){
    return x+y+z
}
let data=[4,5,9]
console.log(sum(...data))  //18
```

### 箭头函数
