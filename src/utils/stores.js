import { writable } from "svelte/store";

console.log(JSON.parse(localStorage.getItem("user")), "<< localStorage");

export const user = writable(JSON.parse(localStorage.getItem("user")) || null);

user.subscribe((val) => {
  localStorage.setItem("user", JSON.stringify(val));
});