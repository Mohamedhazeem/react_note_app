import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T | (()=> T)) =>{

    const [value, setValue] = useState<T>(()=>{
        const jsonValue: string | null= localStorage.getItem(key);
        if(jsonValue == null){
            if(initialValue === 'function'){
                return (initialValue as () => T) ();
            }else{
                return initialValue;
            }
        }else{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return JSON.parse(jsonValue);
        }
    });
    useEffect(() =>{
        localStorage.setItem('key', JSON.stringify(value));
    },[value,key])
    return [value,setValue] as [T, typeof setValue];
}