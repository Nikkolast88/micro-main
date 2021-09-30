# 前端规范细则

## Javascript，Vue

- 要求在语句末尾使用分号

> 错误 代码示例：

```javascript
/*eslint semi: ["error", "always"]*/

var name = "ESLint"

object.method = function() {
    // ...
}
```

> 正确 代码示例：

```javascript
/*eslint semi: "error"*/

var name = "ESLint";

object.method = function() {
    // ...
};
```

- 使用单引号

> 错误 代码示例：

```javascript
/*eslint quotes: ["error", "single"]*/

var double = "double";
var unescaped = "a string containing 'single' quotes";
```

> 正确 代码示例：

```javascript
/*eslint quotes: ["error", "single"]*/

var single = 'single';
var backtick = `back${x}tick`; // backticks are allowed due to substitution
```

- 操作符周围有空格

> 错误 代码示例：

```javascript
/*eslint space-infix-ops: "error"*/

a+b

a+ b

a +b

a?b:c

const a={b:1};

var {a=0}=bar;

function foo(a=0) { }
```

> 正确 代码示例：

```javascript
/*eslint space-infix-ops: "error"*/

a + b

a       + b

a ? b : c

const a = {b:1};

var {a = 0} = bar;

function foo(a = 0) { }
```

- 键和值之间使用一致的空格

> 错误 代码示例：

```javascript
var obj = { "foo":42 };
```

> 正确 代码示例：

```javascript
var obj = { "foo": 42 };
```

- 使用逗号结束

> 错误 代码示例：

```javascript
/*eslint comma-dangle: ["error", "always"]*/

var foo = {
    bar: "baz",
    qux: "quux"
};

var arr = [1,2];

foo({
  bar: "baz",
  qux: "quux"
});
```

> 正确 代码示例：

```javascript
/*eslint comma-dangle: ["error", "always"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var arr = [1,2,];

foo({
  bar: "baz",
  qux: "quux",
});
```

- 开发环境可以使用console，debugger等调试，但打包，未去除，会直接抛出异常，无法编译通过
- svg如果是采用组件形式引入的话，要在后面加上?component，css的background中引入则不需要
- sass compression-webpack-plugin,不要升级，新版支持webpack5
- npm run lint 修复代码格式问题
- npm run lint:stylelint 修复样式问题

## HTML，CSS变量（未强制要求）

- 文件名，.vue文件（除index外首字母一律大写）；
- Js变量采用驼峰命名
- Class样式命名尽量采用BEM命名法
- 样式校验采用stylelint

## 建议配置

- VsCode编辑器
- Chrome / Edge

- 插件
    > stylelint 校验css

    > ESlint 校验代码格式

    > Prettier 格式化代码

    > Debugger from Chrome

    > Volar Vue3新语法支持

    > KoroFileHeader 代码注释工具

    > Auto Rename Tag

    > Auto Close Tag
