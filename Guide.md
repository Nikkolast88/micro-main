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

- 开发环境可以使用console，debugger等调试，但打包，未去除，会直接抛出异常，可以编译通过（打包时，已通过插件移除）
- svg如果是采用组件形式引入的话，要在后面加上?component，css的background中引入则不需要（不推荐）
- npm run lint 修复代码格式问题
- npm run lint:stylelint 修复样式问题

## Vue

Vue3，因采用setup，组件name要想定义的话，需要另起script块，所以组件名即文件名（推荐）

## HTML，CSS变量（未强制要求）

- Js变量采用驼峰命名
- Class样式命名尽量采用BEM命名法
- 样式校验采用stylelint，对应属性顺序如下：（可自动修复）

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  /* Box Model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;

  /* Typography */
  color: #888;
  font: normal 16px Helvetica, sans-serif;
  line-height: 1.3;
  text-align: center;

  /* Visual */
  background-color: #eee;
  border: 1px solid #888;
  border-radius: 4px;
  opacity: 1;

  /* Animation */
  transition: all 1s;

  /* Misc */
  user-select: none;
}
```

![http-bw][http-bw]

[http-bw]:https://zh.javascript.info/article/coding-style/code-style.svg

## 建议配置

- VsCode编辑器
- Chrome / Edge

- 插件
    > stylelint 校验css(推荐)

   *注意：需要安装插件，并配置

    ```text
    vscode中,"stylelint.validate": ["css","less","postcss","scss","vue"]需要添加对应的文件支持,添加vue、scss错误❌提示
    ```

    > ESlint 校验代码格式(推荐)

    > Prettier 格式化代码(推荐)

    > Debugger from Chrome

    > Volar Vue3新语法支持(推荐)

    > KoroFileHeader 代码注释工具

    > Auto Rename Tag

    > Auto Close Tag

    > i18n Ally(推荐)

    *注意：需要安装插件，并配置

    ```text
    **注意进行配置*
    1、vscode中，"i18n-ally.enabledParsers": ["ts"]需要添加对应的文件支持,添加ts文件支持。
    2、git clone 前需配置
    git config --global core.autocrlf false
    git config --global core.eol lf
    将 git 的 autocrlf 功能设置为 false，并把 eol（end of line）设置为lf，再重新clone一下代码就可以了。
    3、vscode中，搜索Files:EOL为LF。
    4、代码中不会提示，看是否全局安装typescript, npm  install -g typescript
    ```

## 版本发布

注意: pnpm run release 将会自动累计版本号，除非手动指定

```js
pnpm run release -- --prerelease
```

将会发布成:1.0.1-0

```js
pnpm run release -- --prerelease alpha
```

将会发布成:1.0.1-alpha.0

```js
pnpm run release -- --release-as 1.1.0
```

将会发布成: 1.1.0

## 代码提交规范

注意: 代码提交到gitlab、将会校验文本格式

```bash
git commit -m 'fix: Bug'
```

这样提交是可以通过
或者你可以使用脚本命令行来提交，你将得到更全面的提交提示

```bash
pnpm run commit
```
