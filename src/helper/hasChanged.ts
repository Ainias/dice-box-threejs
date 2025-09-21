export function hasChanged<Type>(newVal:Type|undefined, prevVal: Type){
    return newVal !== undefined &&  newVal !== prevVal;
}
