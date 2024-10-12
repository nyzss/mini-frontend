import { HTMLAttributes } from "react";
import { Routes, TagElement } from "./types";

const tag = (
	name: keyof HTMLElementTagNameMap,
	attributes: HTMLAttributes<HTMLElementTagNameMap> = {},
	...child: HTMLElement[]
): TagElement & HTMLElement => {
	const result = document.createElement(name) as TagElement;
	if (attributes) {
		for (const attr in attributes) {
			result.setAttribute(attr, attributes[attr]);
		}
	}
	for (const el of child) {
		result.appendChild(el);
	}

	result.attr = (name, value) => {
		result.setAttribute(name, value);
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

	let el = tag("h1");
	el.textContent = "hello world";
	entry.appendChild(tag("div", { id: "new_el" }, el));
};

export const contactHandler = (route: Routes) => {
	console.log("current route: ", route.description);
};

export const aboutHandler = (route: Routes) => {
	console.log("current route: ", route.description);
};
