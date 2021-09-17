<img style="display: block" src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="drawing" width="200"/>

# Angular InterviewApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Installed Libraries

For ease of use we have installed:

- Bootstrap
- Angular Materials.

#### API URL - https://jsonplaceholder.typicode.com

API URL is listed as a constant `SERVER_URL` and a proxy created to prevent any CORS issues. The API accepts any of the following request types in the list.

Also please keep in mind this is a free playground server that allows us to write code against it. POST will not actually be stored however you should be able to go through the motions of completing your post and representing that data in your component. We understand on refresh the POST item will be gone.

- GET /todos
- GET /todos/`{:id}`
- POST /todos
- PUT /todos/`{:id}`
- PATCH /todos/`{:id}`
- DELETE /todos/`{:id}`

## Directions

For UX condisderations:

Please use the following Adobe XD link as your mock to build your interface.  As a call out the mobile view todos when clicked on in the mock show the delete and edit CTAs. 

[Adobe XD Mock Link](https://xd.adobe.com/view/6b3b13dc-60b2-4e1b-95bc-8705ed6a2b2c-3e68/)

- Build an interface to display the data and a company logo (from https://logoipsum.com/)
  - Moible experience should be full page width
  - Desktop experience should be 3/4 page width
- Overwrite some of the styles that come from Bootstrap and/or the Angular Material theme. This can be anything you want to change.

Modify the todo service however you like to accomplish the following: Use RXJS Observable patterns.

- Use the TodoService to GET list of TODOs
- Use the TodoService to GET a single TODO (Optional but feel free to show us your wow factor)
- Use the TodoService to POST a new TODO.
- Use the TodoService to PUT a change to a TODO.
- Use the TodoService to PATCH a TODO.
- Use the TodoService to DELETE a TODO.

Create a component to display a list of all the todos

- It should display all todos
- It should allow you to add
- It should allow you to remove todos
- It should allow you to change status of a todo
- It should allow you to change the name of a todo (Optional but again show us what you got)

### Create an interface for the todos

- id
- title
- userId
- completed

```json
{
  "id": 1,
  "completed": false,
  "title": "Go to Bank",
  "userId": 1
}
```

## Help Links

#### Bootstrap - https://getbootstrap.com/docs/4.3/getting-started/introduction/

#### Angular Materials - https://material.angular.io/components/categories

#### Font Awesome - https://fontawesome.com/icons?from=io

#### Angular - https://angular.io/docs
