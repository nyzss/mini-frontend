import { HTMLAttributes } from "react";
import { Routes, TagElement } from "./types";

const tag = <K extends keyof HTMLElementTagNameMap>(
	name: keyof HTMLElementTagNameMap,
	...child: HTMLElement[] | string[]
): TagElement<K> => {
	const result = document.createElement(name) as TagElement<K>;
	for (const el of child) {
		if (el instanceof HTMLElement) result.appendChild(el);
		else result.appendChild(text(el));
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

const text = (s: string) => {
	return document.createTextNode(s);
};

export const indexHandler = (route: Routes) => {
	console.log("current route: ", route.description);
	let entry = document.getElementById("entry");

	entry.appendChild(
		tag(
			"div",
			tag("h1").attr("id", "wow").content("this is some quality content"),
			tag("a").attr("href", "/asdf").content("wowwowowowo")
		)
	);
};

export const contactHandler = (route: Routes) => {
	console.log("current route: ", route.description);
};

export const aboutHandler = (route: Routes) => {
	console.log("current route: ", route.description);
};
