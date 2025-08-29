1. getElementById, getElementsByClassName, and querySelector / querySelectorAll:
getElementById returns a single element by its unique ID. getElementsByClassName returns a live HTMLCollection of all elements with a specific class name. querySelector returns the first element that matches a CSS selector, while querySelectorAll returns a static NodeList of all matching elements. The querySelector methods are more flexible and allow for complex selectors.

2. Creating and Inserting a New Element into the DOM:
You can create a new element using document.createElement("tag"), set its content or attributes, and insert it into the DOM using methods like appendChild, insertBefore, or append.

3. Event Bubbling:
Event bubbling is the process where an event starts from the deepest target element and bubbles up through its ancestors. For example, a click on a button inside a div will trigger the button's event first, then the div’s, and so on up to the root.

4. Event Delegation:
Event delegation is a technique where a parent element handles events for its child elements using a single event listener. It relies on event bubbling and is useful for managing many child elements efficiently or handling dynamically added elements.

5. preventDefault() vs. stopPropagation():
preventDefault() stops the default action of an event (like submitting a form), while stopPropagation() prevents the event from bubbling up to parent elements. They control different aspects of event handling.
