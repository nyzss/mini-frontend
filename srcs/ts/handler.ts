import { HTMLAttributes } from "react";
import { Routes, TagElement } from "./types";

const tag = <K extends keyof HTMLElementTagNameMap>(
	name: keyof HTMLElementTagNameMap,
	...child: HTMLElement[]
): TagElement<K> => {
	const result = document.createElement(name) as TagElement<K>;
	for (const el of child) {
		result.appendChild(el);
	}

	result.attr = (name, value) => {
		result.setAttribute(name as string, value);
		return result;
	};

	result.content = (value) => {
		result.textContent = value;
		return result;
	};

	return result;
};

export const indexHandler = (route: Routes) => {
	console.log("current route: ", route.description);
	let entry = document.getElementById("entry");

	let el = tag("h1")
		.attr("id", "wow")
		.content("this is some quality content");
	let another = tag("a").attr("href", "/asdf").content("wowwowowowo");
	entry.appendChild(tag("div", el, another));
};

export const contactHandler = (route: Routes) => {
	console.log("current route: ", route.description);
};

export const aboutHandler = (route: Routes) => {
	console.log("current route: ", route.description);
};
