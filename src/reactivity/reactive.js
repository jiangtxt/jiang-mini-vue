// reactive响应式对象

import { effect, track, trigger } from "./effect.js";

// reactive函数
const reactive = (target) => {
  // if (!isObject(target)) {
  //   return target
  // }
  const handler = {
    get(target, key, receiver) {
      console.log("get");
      const res = Reflect.get(target, key, receiver);
      // if (isObject(res)) {
      //   return reactive(res)
      // }

      // track函数用于收集依赖
      track(target, key);
      return res;
    },
    set(target, key, value, receiver) {
      console.log("set");
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      if (result && oldValue !== value) {
        // trigger函数用于触发更新
        trigger(target, key);
      }
      return result;
    },
  };
  return new Proxy(target, handler);
};

//测试用例

const test1 = reactive({ name: "张三", age: 10 });
// 为test1添加一个副作用函数
effect(() => {
  console.log("effect", test1.age);
});

setTimeout(() => {
  test1.age = 100;
}, 1000);
