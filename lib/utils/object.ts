export function objExcept(obj: object, keys: string[]) {
    const vkeys = Object.keys(obj).filter(k => !keys.includes(k));

    return objOnly(obj, vkeys);
}

export function objOnly(obj: object, keys: string[]) {
    return keys
        .map( k => k in obj ? { [k]: obj[k] } : {} )
        .reduce((res, o) => Object.assign(res, o), {});
}