# vue-yun-admin

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



#### git命令

提交代码，回退代码，查看提交记录，git切换分支合并分支，git冲突解决。

![git](C:\Users\liuwenhua\Pictures\Camera Roll\git.png)

1、提交代码

```
git pull   // 拉取
git status  //查看状态
git add     //代码提交到暂存库
git commit  //提交本地库
git push   //推送远端
```

2、回退代码

```
git reset   //回退代码
--mixed  --soft   --hard

git reset --soft HEAD^，撤销commit，工作区，暂存区不变；本地仓库还原。
git reset --hard HEAD^，撤销commit，工作区，暂存区，本地仓库代码都还原。
git reset --mixed HEAD^   撤销commit，工作区不变；暂存区，本地仓库还原。
git checkout .，丢弃本次修改内容
```

参考文章：https://www.jianshu.com/p/c2ec5f06cf1a

3、查看提交记录

```
git log  查看提交记录
```

4、git切换分支合并分支

```
现在想要把one分支合并到master分支下
1、首先切换到master分支下
	git checkout master
2、把远程master上的代码pull下来
	git pull origin master
3、把one分支的代码合并到master上 
	git merge one
4、查看状态
	git status
5、执行提交命令
	git push origin master
如果只是合并某一个提交则可以使用
git cherry-pick hashID
```

5、解决冲突。

冲突类型：

1.不同分支下的merge

比如在不同分支下进行分支合并时，我们在本地修改了a文件并把a文件的修改push到了test分支下，接着我们切换到master分支下将test分支上的修改合并到当前master分支下时，如果master分支下的a文件也有修改的话，这时在进行merge也会产生冲突。（因为这个两个分支是不同步的，两个分支下的同一个文件都有修改）

2.同一个分支下的pull或push

比如在同一个分支下，对本地的a文件做出了修改，此时我们在进行pull或push时如果远程分支下下的a文件也有修改，那么代表本地和远程分支的代码是不同步的，此时也会引起冲突。

要想不产生冲突的习惯是：修改文件之前先git pull,获取远程最新的代码，同步完了之后再对代码进行修改

类型一解决方案：

```
// one 分支合并到master分支发生冲突
git pull 拉去master最新代码
本地解决冲突
git merge one
git add 
git commit
git push
```

类型二解决方案：

```
git pull 
本地解决冲突
git add 
git commit
git push
```

### Vue

#### Vue常用指令和事件修饰符

```
v-if用来判断是否加载html的DOM

v-else：如果上一兄弟元素的v-if取值为false，则v-else所在元素被渲染，反之，上一兄弟元素的v-if绑定的值为true，则不渲染

v-else-if：如果上一兄弟元素绑定的表达式的值没有匹配到，则判断v-else-if的取值，如果是true，则指令所在元素被渲染，否则不渲染

v-show调整css中display属性，DOM已经加载，只是CSS控制没有显示出来。

v-for指令是循环渲染一组data

v-text更新元素的 `textContent`。

v-html更新元素的 innerHTML

v-on绑定事件，缩写为@
		
v-bind处理HTML中的标签属性，缩写为 :

v-model指令，我理解为绑定数据源。双向绑定

	.lazy：取代 imput 监听 change 事件。

	.number：输入字符串转为数字。

	.trim：输入去掉首尾空格。

v-pre在模板中跳过vue的编译，直接输出原始值。

v-cloak在vue渲染完指定的整个DOM后才进行显示。它必须和CSS样式一起使用

v-once在第一次DOM时进行渲染，渲染完成后视为静态内容，跳出以后的渲染过程。

	.stop - 调用 event.stopPropagation() 阻止事件冒泡。

	.prevent - 调用event.preventDefault()。阻止元素的默认行为。

	.capture - 添加事件侦听器时使用 capture 模式。

	.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。

	.once - 只触发一次回调。
```

#### v-if与v-show的区别

v-if： 判断是否加载，可以减轻服务器的压力，在需要时加载。

v-show：调整css dispaly属性，可以使客户端操作更加流畅。

#### Computed与watcher的区别

1.watch擅长处理的场景：一个数据影响多个数据。当你监听的属性发生变化时，调用监听方法。

2.computed擅长处理的场景：一个数据受多个数据影响。当计算依赖的属性发生变化时，调用该方法。

Computed: 可以关联多个实时计算的对象，当这些对象中的其中一个改变时都会触发这个属性。具有缓存能力，所以只有当数据再次改变时才会重新渲染，否则就会直接拿取缓存中的数据。

watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率。

计算属性不能执行异步任务。计算属性一般不会用来向服务器请求或者执行异步任务

#### MVVM的理解

MVVM是Model-View-ViewModel缩写，也就是把MVC中的Controller演变成ViewModel。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。

#### 数据双向绑定原理（vue响应式实现的原理）

通过Object.defineProperty去劫持data里的属性，将data全部属性替换成getter和setter，配合发布者和订阅者模式，每一个组件都有一个watcher实例，当我们对data属性赋值和改变，就会触发setter，setter会通知watcher，从而使它关联的组件进行重新渲染。

这些 getter/setter 对用户来说是不可见的，但是在内部它们让 vue 能够追踪依赖，在这些属性被访问和修改时通知变更。

![双向绑定](C:\Users\liuwenhua\Pictures\双向绑定.png)

**对于对象**

- Vue 无法检测属性的手动添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。例如：

```javascript
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的
```

- 对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property。

```javascript
Vue.set(vm.someObject, 'b', 2)
```

- 您还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名

```javascript
this.$set(this.someObject,'b',2)
```

**对于数组**

- Vue 不能检测以下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
2. 当你修改数组的长度时，例如：vm.items.length = newLength

```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

- 为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将在响应式系统内触发状态更新：

```javascript
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)

// vm.$set, 全局方法 Vue.set 的一个别名
vm.$set(vm.items, indexOfItem, newValue)
```

#### Vue生命周期

什么是vue生命周期？

Vue 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载DOM-渲染、更新-渲染、卸载等一系列的过程，我们称这是 Vue 的生命周期。

**vue生命周期的作用是什么：**

`beforeCreate`：创建前，此阶段为Vue实例初始化之后，this指向创建的实例，此时的数据观察事件机制都未形成，不能获得DOM节点。data，computed，watch，methods 上的方法和数据均不能访问。可以在这加个loading事件。

`created`：创建后，此阶段为实例已经创建，完成数据（data、props、computed）的初始化导入依赖项。可访问 data computed watch methods 上的方法和数据。

初始化完成时的事件写在这里，异步请求也适宜在这里调用（请求不宜过多，避免白屏时间太长）。可以在这里结束loading事件，还做一些初始化，实现函数自执行。

未挂载DOM，若在此阶段进行DOM操作一定要放在Vue.nextTick()的回调函数中。

`beforeMount`：挂载前，虽然得不到具体的DOM元素，但vue挂载的根节点已经创建，下面vue对DOM的操作将围绕这个根元素继续进行。beforeMount这个阶段是过渡性的，一般一个项目只能用到一两次。

`mounted`：挂载，完成创建vm.$el，和双向绑定完成挂载DOM和渲染，可在mounted钩子函数中对挂载的DOM进行操作。可在这发起后端请求，拿回数据，配合路由钩子做一些事情。

`beforeUpdate`：数据更新前，数据驱动DOM。在数据更新后虽然没有立即更新数据，但是DOM中的数据会改变，这是vue双向数据绑定的作用。可在更新前访问现有的DOM，如手动移出添加的事件监听器。

`updated`：数据更新后，完成虚拟DOM的重新渲染和打补丁。组件DOM已完成更新，可执行依赖的DOM操作。

注意：不要在此函数中操作数据（修改属性），会陷入死循环。

`activated`：在使用vue-router时有时需要使用<keep-alive></keep-alive>来缓存组件状态，这个时候created钩子就不会被重复调用了。如果我们的子组件需要在每次加载的时候进行某些操作，可以使用activated钩子触发。

`deactivated`：<keep-alive></keep-alive>组件被移除时使用。

`beforeDestroy`：销毁前，可做一些删除提示，如：您确定删除xx吗？

`destroyed`：销毁后，当前组件已被删除，销毁监听事件，组件、事件、子实例也被销毁。这时组件已经没有了，无法操作里面的任何东西了。

![Vue生命周期](C:\Users\liuwenhua\Pictures\Camera Roll\Vue生命周期.png)

#### 父子组件的生命周期

创建vue实例从外到内 (从父组件到子组件)

渲染和销毁从内到外(从子组件到父组件)

更新过程：

​	`父before update--子before update--子updated--父updated`

销毁过程：

​	`父 before destroy -- 子before destroy--子destroy--父destroy`

加载渲染过程：

​	`父 before create --父created --父before mount --子before create --子created--子before mount--子mounted--父mounted`

####vue组件间通讯方式

1、`props`和`$emit`

父组件向子组件传递数据是通过prop传递的，子组件传递数据给父组件是通过$emit触发父组件的事件传递参数。

2、`ref `/ `$refs`

ref：这个属性用在子组件上，它的用用就指向了子组件的实例，可以通过实例来访问组件的数据和方法。

$ref：用于父组件在中获取子组件的ref实例的数据和方法。

3、`$parent `/ `$children`（可用于兄弟组件）

使用`$parent`可以让组件访问父组件的实例（访问的是上一级父组件的属性和方法）。

使用` $children`可以让组件访问子组件的实例，但是，`$children `并不能保证顺序，并且访问的数据也不是响应式的。

4、eventBus事件总线（`$emit` /` $on`）（可用于兄弟组件）

发布者订阅者模式。使用`$emit`抛出事件，使用`$on`接收事件。

5、Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式

#### Vue中事件派发

$on：监听事件

$off：移除监听事件

$emit：触发事件

$once：监听事件，只监听1次

#### NextTick 是做什么到？

来自 Vue 官网讲述：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

由于Vue的数据驱动视图更新是异步的，即修改数据的当下，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。

页面渲染时会将data修改整合，多次获取data的修改只会渲染一次。

在同一事件循环中的数据变化后，DOM完成更新，立即执行nextTick(callback)内的回调。

Vue给我们提供了两种函数:

vm.\$nextTick和Vue.nextTick。在页面重新渲染、DOM更新后，Vue会立刻执`$nextTick`，我们可以在`$nextTick`中传递回调函数来获取我们想要的值。

```
Vue.nextTick(() => {})	Vue.nextTick内部函数的this指向window
this.$nextTick(() => {})   vm.$nextTick内部函数的this指向Vue实例对象 一般都使用这个。
```

在Vue生命周期的created()钩子函数进行的DOM操作的时候需要要放在Vue.nextTick()的回调函数中。

使用场景：

数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。

参考文章：https://blog.csdn.net/qq_24147051/article/details/105774852

#### Slot插槽的理解

插槽，也就是slot，是组件的一块HTML模板，这块模板显示不显示、以及怎样显示由父组件来决定。

slot的用法可以分为三类，分别是默认插槽、具名插槽和作用域插槽
**子组件中：**

插槽用<slot>标签来确定渲染的位置，里面放置如果父组件没传内容时的后备内容。

具名插槽用name属性来表示插槽的名字，不传为默认插槽。

作用域插槽在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件slot-scope接受的对象上。

**父组件中在使用时：**

默认插槽的话直接在子组件的标签内写入内容即可

具名插槽是在默认插槽的基础上加上slot属性，值为子组件插槽name属性值

作用域插槽则是通过slot-scope获取子组件的信息，在内容中使用。这里可以用解构语法去直接获取想要的属性。

slot本质上是返回VNode的函数，一般情况下，Vue中的组件要渲染到页面上需要经过template >> render function >> VNode >> DOM 过程。 组件挂载的本质就是执行渲染函数得到VNode，至于data/props/computed这些属性都是给VNode提供数据来源。

参考文章：

https://juejin.cn/post/6908641917496623117

#### 动态组件与Keep-alive

1.什么是动态组件
动态组件指的是动态切换组件的显示与隐藏。让多个组件使用同一个挂载点，并动态切换，这就是动态组件

简单的说，动态组件就是将几个组件放在一个挂载点下，这个挂载点就是标签，其需要绑定is属性，属性值为父组件中的变量，变量对应的值为要挂载的组件的组件名，然后根据父组件里某个变量来动态显示哪个，也可以都不显示

根据 v-bind:is="组件名" 中的组件名去自动匹配组件，如果匹配不到则不显示。

例如：`<component :is="currentComponent"></component>`

默认情况下，切换动态组件时无法保持组件的状态。此时可以使用 vue 内置的 `<keep-alive>` 组件保持动态组件的状态。keep-alive把component组件包裹住，keep-alive只是缓存组件，并不会销毁组件。

```
<keep-alive>
      <component :is="name"></component>
</keep-alive>
```

当组件被缓存时，会自动触发组件的 deactivated 生命周期函数
当组件被激活时，会自动触发组件的 activated 生命周期函数

当组件第一次创建时会执行create()生命周期，也会执行activated()生命周期函数。但是在激活组件时只会执行activated()函数而不会执行create()，因为组件没有重新创建。

#### 异步组件

在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。Vue.js 只在组件需要渲染时触发函数，把结果缓存起来，用于后面的再次渲染。按需加载，不展示的时候不加载，展示后会才不会加载。

![vue动态组件](C:\Users\liuwenhua\Pictures\Camera Roll\vue动态组件.png)

```vue
<template>
  <div id="app">
    <button @click="show = !show">click</button>
    <AsyncCmp v-if="show" />
  </div>
</template>
<script>
// import AsyncCmp from './components/async-cmp'
export default {
  components: {
    // AsyncCmp,
    AsyncCmp: () => import('./components/async-cmp'),
  },
  data () {
    return {
      show: false,
    }
  }
}
</script>
```

#### Key的作用

Vdom中的diff算法通过tag和key来判断是否是相同的结点，减少渲染的次数，提高渲染的性能，而且key不能是index和random。

diff算法时比较同级之间的不同，以key来进行关联，当对数组进行下标的变换时，比如删除第一条数据，那么以后所有的index都会发生改变，那么key自然也跟着全部发生改变，所以index作为key值是不稳定的，而这种不稳定性有可能导致性能的浪费，导致diff无法关联起上一次一样的数据。因此，能不使用index作为key就不使用index。

不使用random随机数是因为当数据发生变化的时候random随机数也会发生变化，key也会随之改变。

#### Vdom的理解

vdom很好的将dom做了一层映射关系，进而将在我们本需要直接进行dom的一系列操作，映射到了操作vdom，而vdom上定义了关于真实dom的一些关键的信息，vdom完全是用js去实现，和宿主浏览器没有任何联系，而js的执行速度很快，将原本需要在真实dom进行的创建节点,删除节点,添加节点等一系列复杂的dom操作全部放到vdom中进行，这样就通过操作vdom来提高直接操作的dom的效率和性能。

用js来模拟DOM的结构，计算出最小的变更，操作DOM。

#### 为什么操作DOM很慢

DOM对象本身也是一个js对象，所以严格来说，并不是操作这个对象慢，而是说操作了这个对象后，会触发一些浏览器行为，比如布局（layout）和绘制（paint）。

#### Diff算法的思想理解

只进行统一层级的比较，不跨级比较。

元素不相同，则直接删除重建不再做深度比较。

元素和key值相同，则认为是相同节点，不深度比较。

#### Vue模版编译

Vue 编译原理这块的整体逻辑主要分三个部分，也可以说是分三步，这三个部分是有前后关系的：

第一步是将模板字符串转换成 AST（解析器）

第二步是对AST进行静态节点标记，主要用来做虚拟DOM的渲染优化（优化器）

第三步是 使用AST生成 render 函数代码字符串（代码生成器）

#### 组件渲染过程

组件初次渲染的时候，模板会被编译成render函数，触发响应式ObjectdefineProperty，监听data的setter和getter属性，然后执行render函数，生成虚拟dom树（vnode），通过diff算法patch函数，进行对比渲染。当data发生改变的时候，触发setter，要watcher判断这个data是不是之前监听的，若是，则触发re-render（）生成一个新的vnode然后执行patch，进行对比渲染。

初次渲染时：

解析模版为render函数

触发响应式，监听data属性getter和setter

执行render函数，生成vnode通过patch方法将vnode渲染到页面上。

更新过程

修改data，触发setter

重新执行render函数，生成newVnode

通过patch方法将newVnode渲染到页面上。

#### 前端路由

Hash路由的特点：

hash 虽然出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

hash 模式下，仅 # 之前的内容包含在 http 请求中对后端来说，即使没有对路由做到全面覆盖，也不会报 404

hash 模式的原理是 onhashchange 事件，可以在 window 对象上监听这个事件。并且hashchange 只能改变 # 后面的代码片段。

H5 history

history 利用了 html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈。

history 模式改变 url 的方式或者刷新页面会导致浏览器向服务器发送请求如果服务器中没有相应的响应或资源，就会出现404。我们需要在服务器端做处理：如果匹配不到任何静态资源，则应该始终返回同一个html页面。

#### Vue 路由导航守卫是什么, 以及应用场景

**导航守卫**

- **`to: Route`**: 即将要进入的目标路由对象
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
    - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
    - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
    - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 `router-link` 的 `to` prop或 `router.push` 中的选项。
    - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 `router.onError()` 注册过的回调。

**全局守卫**

1. router.beforeEach（全局前置守卫）  任何路径跳转都要经过他
2. router.beforeResolve（全局解析守卫）   导航被确认之前，同时在所有组件守卫和异步路由组件被解析之后，解析守卫就被调用
3. router.afterEach（全局后置守卫）  路由跳转之后的操作

```
router.beforeEach((to,from,next)=>{

})
//参数 callback()
//参1 向那个路由跳转
//参2 从那个路由来的
//参3 要不要执行
//next()没写参数会自动跳转到你要去的路由中
//next('login')参数是字符串，对应的是path:这个值
//next({path:'/home'}) 参数是对象

router.beforeBesolve((to,from,next)=>{

})

router.afterEach((to,from)=>{

})
```

**路由独享守卫**

1. beforeEnter

```vue
var router = new VueRouter({
	router:[
	{
	path:'/foo',
	comonent:Foo,
	beforeEnter:(to,from,next)=>{

		}
	}
	]
})
```

**组件内守卫**

1. beforeRouteEnter：进入组件之前触发这个路由。在渲染该组件的对应路由被confirm前调用，不能获取组件实例'this'，因为当守卫执行前，组件实例还没被创建。
2. beforeRouteUpdate：在当前路由改变，但是该组件被复用时调用。
3. beforeRouteLeave：导航离开该组件的对应路由时调用。

```vue
beforeRouteLeave(to,from,next){

}
beforeRouteUpdate(to,from,next){

}
```

#### Vue 路由模块中`$route` 和$router 的区别

this.$route：当前激活的路由的信息对象。每个对象都是局部的，可以获取当前路由的 path, name, params, query 等属性。

this.$router：全局的 router 实例。通过 vue 根实例中注入 router 实例，然后再注入到每个子组件，从而让整个应用都有路由功能。其中包含了很多属性和对象（比如 history 对象），任何页面也都可以调用push(),replace(), go() 等方法。

#### 组件中的data为什么是一个函数？

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

#### vue的性能优化

尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher

​	v-if和v-for不能连用

​	如果需要使用v-for给每项元素绑定事件时使用事件代理

​	SPA 页面采用keep-alive缓存组件

​	在更多的情况下，使用v-if替代v-show

​	key保证唯一

​	使用路由懒加载、异步组件

​	防抖、节流

​	第三方模块按需导入

​	长列表滚动到可视区域动态加载

​	图片懒加载
