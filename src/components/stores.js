import { writable } from 'svelte/store';

export const contents = writable([{ datetime: "", html: "", contents: "", plainText: "" },]);