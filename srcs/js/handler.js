/**
 * @typedef {Object} CustomHTMLElement
 * @property {function(string, string): void} [attr] - Method to set an attribute
 */

/**
 * @param {keyof HTMLElementTagNameMap} name
 * @param {import("react").HTMLAttributes} [attributes={}]
 * @param  {...HTMLElement} child
 */
const tag = (name, attributes = {}, ...child) => {
	/**
	 * @type {HTMLElement & CustomHTMLElement}
	 */
	const result = document.createElement(name);
	if (attributes) {
		for (const attr in attributes) {
			result.setAttribute(attr, attributes[attr]);
		}
	}
	for (const el of child) {
		result.appendChild(el);
	}

	/**
	 * @param {keyof import("react").HTMLAttributes} name
	 * @param {String} value
	 */
	result.attr = (name, value) => {
		result.setAttribute(name, value);
	};
	return result;
};
/**
 * @param {import("./route").Route} route
 */
export const indexHandler = (route) => {
	console.log("current route: ", route.description);
	let entry = document.getElementById("entry");

	let el = tag("h1");
	el.textContent = "hello world";
	entry.appendChild(tag("div", { id: "new_el" }, el));
};

export const contactHandler = (
	/** @type {import("./route").Route} */ route
) => {
	console.log("current route: ", route.description);
};

export const aboutHandler = (/** @type {import("./route").Route} */ route) => {
	console.log("current route: ", route.description);
};
