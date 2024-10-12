// import { AllHTMLAttributes, HTMLAttributes } from "react";

export interface Routes {
	page: string;
	title: string;
	description: string;
	handler?: (route: Routes) => void;
}

export type TagElement<K extends keyof HTMLElementTagNameMap> =
	HTMLElementTagNameMap[K] & {
		attr: (name: string, value: string) => TagElement<K>;
		content: (value: string) => TagElement<K>;
	};
