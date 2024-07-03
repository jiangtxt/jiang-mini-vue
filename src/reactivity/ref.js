// ref响应式对象

import { effect, track, trigger } from "./effect.js";

// ref方法：返回一个RefImpl对象
export const ref = (value) => new RefImpl(value);

// 构造ref对象
class RefImpl {
  constructor(value) {
    this._value = value;
  }

  get value() {
    track(this, "value");
    return this._value;
  }

  set value(newValue) {
    if (newValue === this._value) return;
    this._value = newValue;
    trigger(this, "value");
  }
}

// 测试
// const count = ref(0);
// effect(() => {
//   console.log("effect", count.value);
// });

// setTimeout(() => {
//   count.value = 100;
// }, 1000);
