# h1 Documentation
Check this information before making pull requests and merging. We should stay in sync with architecture, name of files and classes, otherwise it will be impossible to resolve conflicts appropriately.
If you unsure about name or where should be placed file just ask others for help to keep everyone notified about agreements.

# h3 Architecture
**/pages** - in this directory we are storing our POM classes for pages(like Main Page and Menu Planner) 
**/pages/components** - in this directory we are storing elements that appear on every page(or at least most ones). It is elements such as cart sidebar, login/authorization pop-ups, header, footer, etc.
**/tests** - here we are storing all tests. Since we couldn't find any API of the server we will store everything here(as I noticed everything what possibly could provide request to the server is simply stored in localStorage)

# h3 Naming
 - Functions, methods, properties and variables should be named in camelCase(for example: inputList, addItem, etc.)
 - Classes should be named in PascalCase(for example: MainPage, MenuPlannerPage, etc.)
 - files of classes and components should be named in the following way: xxxx.page.js and xxxx.component.js(xxxx means the name of page/component)
 - files of tests should be named in the following way: xxxx.test.js(xxxx means on which exact page conducted test)
