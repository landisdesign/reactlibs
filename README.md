# reactlibs

## A Madlibs React app made in 12 days

When I learned I might be working with React, I felt I needed to learn more about it. I had used it once a year ago to make a simple single-transition app. I felt this wouldn't be enough to work in a React-centric development environment.

### What I learned

Before this app, I'd built a simple 2-state app using old-school AJAX to fetch a couple of Google search results. In this app, I learned:

* __Functional Components__  
	Before this, I worked with classes and some functional components. This time I used entirely functional components.

* __React Hooks__  
	With functional components came hooks. I learned using hooks for Redux and Router as well as `useEffect`. I kept all my state in Redux, so didn't bother with `useState`.

* __React Router__  
	I figured this would be required knowledge in most larger apps.

* __SCSS Modules__  
	While I'd used SCSS before, I really enjoyed playing with it in this modular style.  

* __Fetch API, `async`/`await` and Promises__  
	Before this, I had used simple AJAX callbacks. This was an opportunity for me to learn more about modern network API's and asynchronous programming.

* __`grid` Layout__  
	I hadn't had the opportunity to use this before. Definitely enjoy it.

* __Third-party module mocking with Fetch__
	When using Fetch with Angular, I didn't have many reasons to mock modules. With React, both Router and Redux were too heavy for my tastes. I created some lightweight shims that let me test my functionality without being concerned with theirs.

	__Note about mocking `node_modules`__  
	I'm not sure why, but putting `__mock__` next to `node_modules` wasn't working. I had to place it down one level. Google yielded no reasons why. My manual node module mocks appear to do be doing their job by placing them in [src/\_\_mocks\_\_](app/src/__mocks__).

* __Enzyme__  
	I had used Fetch before, primarily in conjunction with Angular. This was my first time testig with Enzyme and discovering its quirks.

### Artifacts

The artifacts directory holds my first test cases and initial designs for putting this together.

### Module structure

Because this is a fairly small, single-purpose project, I chose to split the code into visual elements and layouts, and application-specific components. The components manipulate the Redux state and present the results in the visual elements.

I also have a top-level directory for the SVG icons, since they are consistent chunks of single-purpose code and could expand to any number of icons.

### Comments on my code structure

My personal preference is nesting functions that won't be exported. This lets me visually narrow their scope as well as encapsulate the code. With a small application, the function recreation overhead shouldn't be too painful. With larger numbers of components, I may eventually have to begin extracting these inner functions. Profiling would describe the best locations for these optimizations.

I also prefer to make my functions short, preferably not much more than 20 lines or so, to reduce the amount of code that needs to be mentally tracked at any given time. If a function gets too long, I'll break it up into descriptively named functions.

I prefer standard functions to arrow functions. They permit hoisting, which allows me to, for example, put propType declarations above the function where the parameters can be defined up front for incoming developers. It also makes it easier for me to visually distinguish between function expressions and regular variable assignments. The less I have to think, the better!

I do prefer arrow functions for simple pure utility functions, as well as for simple lambda functions that can fit in a short line. If a lambda function starts getting too big or confusing as an expression, I'll turn it into a descriptively named function. I'll also use them when their primary purpose is wrapping an entire function in a callback, such as with testing functions.

These are all personal greenfield preferences. I'm happy to follow whatever patterns are being used where I go.

(As a note, my prior job had us using double quotes for strings. After 15 years of that, and seeing single quotes taking the JavaScript world by storm, I'm seeing myself mix the two quote types in my code as my fingers fly through accustomed patterns. I expect to be able to conform as I follow a specific pattern and retrain my fingers.)
