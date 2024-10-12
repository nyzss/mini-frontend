import { HTMLAttributes } from "react";
import { Routes, TagElement } from "./types";

const tag = <K extends keyof HTMLElementTagNameMap>(
	name: keyof HTMLElementTagNameMap,
	...child: (TagElement<K> | string | (TagElement<K> | string)[])[]
): TagElement<K> => {
	const result = document.createElement(name) as TagElement<K>;

	const appendChildTag = (el: TagElement<K> | string) => {
		if (el instanceof HTMLElement) result.appendChild(el);
		else result.appendChild(text(el));
	};

	child.flat().forEach(appendChildTag);

	result.attr = (name, value) => {
		result.setAttribute(name as string, value);
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

	let elements = tag(
		"div",
		tag("h1", "this is the content of the h1").attr("id", "wow"),
		tag("a", "this is the content of the ahref").attr("href", "/asdf"),
		[...Array(10)].map((_, i) =>
			tag("h1", "this is text number: ", i.toString())
		)
	);
	entry.appendChild(elements);
};

export const contactHandler = (route: Routes) => {
	console.log("current route: ", route.description);
};

export const aboutHandler = (route: Routes) => {
	console.log("current route: ", route.description);
};
