# create-ali-app
A simple CLI for scaffolding Alipay miniapp projects.  
一个快速创建支付宝小程序项目的脚手架，支持`scss`编译。

生成的目录结构参见：[tinyapp-template](https://github.com/xinconan/tinyapp-template)

## Usage:
```bash
npm install create-ali-app -g
create-ali-app your-app
cd your-app
npm install
# 安装完成之后，运行命令即可监听scss文件的修改
npm run watch
# for build
npm run build
# use command to create a new page(include eg:page.axml,page.json,page.acss,page.js)
npm run create page
```
Enjoy!  
如果有任何问题或者建议，欢迎提issue或PR！

## License
MIT