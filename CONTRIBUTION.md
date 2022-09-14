# Contributing to this Project

## Creating a Page

To create a new Page you have to create a component inside `src/pages`.
A Pagecomponent can be given some properties to handle the page rendering:

### blank

The blank property tells the app whether the Page should be rendered as a blank page without any providers.
This is especially important for independent pages for example a Swagger API documentation UI like in `src/pages/swagger.js`

#### Example

```javascript
const Component = () => {...}
Component.blank = true

export default Component
```

### getLayout

The getLayout property is a function that can the component be rendered in.
It is useful to render a page with a different layout as the default UserLayout.
It can also be used to not use a layout like in the example below.

#### Example

```javascript
const Component = () => {...}
ApiDoc.getLayout = page => page

export default Component
```
