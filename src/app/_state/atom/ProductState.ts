import { atom } from "recoil";

type info = {id:string, title:string}

export const productInfoObject = atom({
    key: 'product', // unique ID (with respect to other atoms/selectors)
    default: {} as info, // default value (aka initial value)
  });
export const productImageId = atom({
    key: 'product', // unique ID (with respect to other atoms/selectors)
    default: "" as string, // default value (aka initial value)
  });