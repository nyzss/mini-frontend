import { HTMLAttributes } from "react";

export interface Routes {
	page: string;
	title: string;
	description: string;
	handler?: (route: Routes) => void;
}

export interface TagElement extends HTMLElement {
	attr: (
		name: keyof HTMLAttributes<HTMLElement>,
		value: string
	) => TagElement;
	content: (value: string) => TagElement;
}
