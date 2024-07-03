// computed响应式对象

import { effect, track, trigger } from "./effect.js";
import { ref } from "./ref.js";

// ref方法：返回一个RefImpl对象
export const computed = (getter) => new ComputedImpl(getter);

// 构造ref对象
class ComputedImpl {
  constructor(getter) {
    this.effect = effect(getter, () => {
      trigger(this, "value");
    });
  }

  get value() {
    this._value = this.effect();
    track(this, "value");
    return this._value;
  }
}

// 测试
const a = ref(10);
const b = computed(() => a.value * 2);
effect(() => {
  console.log("b.value", b.value);
});

setTimeout(() => {
  a.value = 102;
  // console.log("b.value", b.value);
}, 1000);
setTimeout(() => {
  a.value = 102;
  // console.log("b.value", b.value);
}, 2000);
