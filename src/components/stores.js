// import { writable } from 'svelte/store';


// export const contents = writable([{ datetime: "", html: "", contents: "", plainText: "" },]);


import { writable } from 'svelte-persistent-store/dist/local';
export const contents = writable("contents", "");

