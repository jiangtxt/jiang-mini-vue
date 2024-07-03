// effect--副作用函数管理器

let activeEffect = null;

// 记录响应式对象：targetMap--depsMap--dep
const targetMap = new WeakMap();

// effect函数--副作用函数
export const effect = (fn, scheduler = null) => {
  const effectFn = () => {
    return fn();
  };
  activeEffect = effectFn;
  effectFn();
  activeEffect = null;
  if (scheduler) {
    effectFn.scheduler = scheduler;
  }
  return effectFn;
};

// track函数--收集依赖
export const track = (target, key) => {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
};

// trigger函数--触发更新
export const trigger = (target, key) => {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => {
      if (effect.effectFn) {
        effect.effectFn();
      } else {
        effect();
      }
    });
  }
};
