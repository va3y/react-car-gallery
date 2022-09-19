# Auto app

Live: https://react-car-gallery.vercel.app

## Available Scripts

In the project directory, you can run:

### `yarn start`

### `yarn test`

### `yarn build`


## Features

* CRA as a template
* Basic UI elements, styled with Tailwind
* Typescript type checking
* Redux Toolkit for state management, with RTK Query for requests
  * The app automatically caches previous calls
  * Loading states are implemented for slow connections
  * For desktop users, the response is almost instant, so no loading animation is shown (it has a 400ms delay)
* Testing with RTL and MSW for real-like requests mocks
* Navigation with [Wouter](https://github.com/molefrog/wouter) (React Router looked overkill for this app)
* Pagination and filters 
* Possible to save car to user's memory persistently

## What can be improved

* Responsive design for mobile and tablet users.
* i18n supoprt. So far, all the text content is in English string literals.
* More tests can be written. I've only done more [high-level ones](./src/pages/__tests__) so far.
* Moving off CRA and adding solution for SSR (possibly Next.js) to improve loading speeds.
* Solutions for image prefetch and DNS-prefetch. Right now, the there assets were placeholder images, but in real app it's a good idea to consider.
* Separating ui-kit into its own package to reuse it between services.