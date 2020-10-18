
![](images/gohttp.png)

# gohttp

针对HTTP/1.1封装的客户端请求库。

基于Promise实现，可以通过then接收返回结果，或者配合async/await使用。

## 安装

```
npm i gohttp
```

## GET请求

``` JavaScript

const gohttp = require('gohttp');

gohttp.get('http://localhost:2020/')
        .then(res => {
            console.log(res.headers, res.status);
            return res.text();
        })
        .then(result => {
            console.log(result);
        });

```

## POST请求

``` JavaScript

const gohttp = require('gohttp');

gohttp.post('http://localhost:2020/p', {
            body : {
                user: 'wang'
            }
        })
        .then(res => {
            return res.text();
        })
        .then(result => {
            console.log(result);
        });

```

## 上传文件

``` JavaScript

const gohttp = require('gohttp');

gohttp.upload('http://localhost:2020/upload', {
            files: {
                image: [
                    'pictures/a.jpg',
                    'pictures/b.png'
                ],
                video: [
                    'videos/a.mp4',
                    'videos/b.mp4'
                ]
            }
        })
        .then(res => {
            return res.text();
        })
        .then(result => {
            console.log(result);
        });

```
