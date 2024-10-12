import { aboutHandler, contactHandler, indexHandler } from "./handler.js";

const urlPageTitle = "nascent";

/**
 * @typedef {Object} Route
 * @property {string} page - The URL of the page.
 * @property {string} title - The title of the page.
 * @property {string} description - The description of the page.
 * @property {function} [handler] - Handler function for the route.
 */

/**
 * @type {Object<string, Route>}
 */
export const routes = {
	404: {
		page: "/pages/not_found.html",
		title: "404 | " + urlPageTitle,
		description: "Page not found",
	},
	"/": {
		page: "/pages/index.html",
		title: "Home | " + urlPageTitle,
		description: "This is the home page",
		handler: indexHandler,
	},
	"/about": {
		page: "/pages/about.html",
		title: "About Us | " + urlPageTitle,
		description: "This is the about page",
		handler: aboutHandler,
	},
	"/contact": {
		page: "/pages/contact.html",
		title: "Contact Us | " + urlPageTitle,
		description: "This is the contact page",
		handler: contactHandler,
	},
};
