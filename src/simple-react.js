class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        this.root.appendChild(child.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(component) {
        this.children.push(component)
    }

    get root() {
        if (!this._root) {
            this._root = this.render().root;
        }
        return this._root;
    }
}

export function createElement(type, attributes, ...children) {
    let ele;
    if (typeof type === 'string') {
        ele = new ElementWrapper(type);
    } else if (typeof type === 'function') {
        ele = new type;
    }
    for (let key in attributes) {
        ele.setAttribute(key, attributes[key]);
    }

    function insertChild(children) {
        for (let child of children) {
            if (Array.isArray(child)) {
                insertChild(child);
            } else {
                if (typeof child === 'string') {
                    child = new TextWrapper(child);
                }
                ele.appendChild(child);
            }
        }
    }

    insertChild(children);
    return ele;
}

export function render(component, parent) {
    parent.appendChild(component.root);
}

