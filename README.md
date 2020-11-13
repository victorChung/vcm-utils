## Install

```
npm install vcm-utils --save
```

## Usage

```
import vcmUtils from 'vcm-Utils';
```

#API


### `getParams | getQueryVariable` 

* 获取地址栏参数

##### args
Default: `(variable, url_str = '')`

url_str有值则获取该字符串中的参数<br>

url_str不填则获取地址栏参数<br>

> example

```
vcmUtils.getParams('abc', 'abc=wer44&aa=www322')
```


### `objToParams(obj)`

* obj拼接成get参数连接


### `deepCopy(obj)` 

* 对象或数组深复制


### `range(d1, d2)`

* d1到d2范围的随机数


### `priceFormat(val, blank)`

* 价格转换(保留两位小数,不足补零,大数字3位数加一个逗号)

> example

```
vcmUtils.priceFormat(123445456);
vcmUtils.priceFormat('123445456');
vcmUtils.priceFormat('', '$$$'); //为空字符串时显示'$$$'
```


### `cookie`

```
{
	setItem(key, value, delay),
	getItem(key),
	removeItem(key)
}
```

* delay 默认cookie为七天之后过期 3s 4m 5h 7d 秒 分 时 天


### `ss`  sessionStorage

```
{
	setItem(name, content),
	getItem(name),
	removeItem(name)
}
```


### `ls`  localStorage

```
{
	setItem(name, content),
	getItem(name),
	removeItem(name)
}
```