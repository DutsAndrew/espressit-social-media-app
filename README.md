# espressit-social-media-app

This was such a fun project to build.

Live Link: https://dutsandrew.github.io/espressit-social-media-app/

How to Use:
* Espressit is a social media / blog platform that allows users to make posts about all things coffee.
* Users can create, edit, modify, and delete their accounts or contributions.
* Users can upvote and downvote posts and comments that they either like or dislike.
* Users can upload posts with links, images, or just texts.
* Users can sort posts by "New", "Hot", "Controversial", or "Contributed"

Tools:
* React, JS, and TypeScript - Frontend
* Firebase BaaS - Backend
* Hooks & State
* Styled Components
* Bad Words Filter
* Sort Scripts
* Lazy Loading
* CSS w/ Mobile/Web dynamic styling

What I learned:
* This was a big project that required a lot of integration of moving parts and planning. I spent 3-4 hours drawing up a mock of the entire site before I started coding. In hindsight this saved at least double that in time coding.

* How to lazy load components. Ever since learning about code splitting I've wanted to give it a try, but haven't had a large enough applicaiton to test it out on. This project gave me an opportunity to try it and it reduced load times by about 40%.

* How to fully integrate a backend into a project. After creating a Weather App, game with a leaderboard, and a api shopping app; I have been using a backend or api to pull data into the UI. This app is 100% reliant on a backend and required regular get and post requests and it was fun figuring out the optimal way to do so while also keeping the data as safe and secure as possible throughout.

* TypeScript and Types are a life saver, seriously. I had at the most 1-4 bugs while building this app. And for that I have TypeScript and it's system of interfaces and Types to thank for that. With a project of this size I was able to see how beneficial having a Type system is and how it can make or break a project. The biggest difference I noticed was when pulling data from the db your code will not know what it's receiving, but when I can say "hey this incoming data is a `Post`", it prevents you from accidentally breaking something down the line in the code, because TypeScript will let you know you're not interacting with the Type correctly.

* Architecture and Designing are very important to increasing readable and easy to fix, update, maintain, and use code. I've been reading "Clean Architecture" and tried to implement the SOLID principles as I built this project.

* Towards the end of this project I learned about removing multiple variable declarations, which I didn't know was a thing. So I went through and linted my entire project removing multiple "const" or "let" variable declarations. I know this is personal preference and I am undecided on which I like more, but for the sake of learning and trying something new I added it into this app.

What I would do differently:
* I think to a degree I over-architectured this project by creating too many files and folders. However, using the "Clean Architecture" book as a guide I built this project with the intention that if needed/wanted it would be scalable; you could add in a "messaging" or "store" function and it should integrate seamlessly, which led me to isolating things more and more, so that if new components were added in, they wouldn't mess with the already existing software. That being said, I think I could've consolidated more instead of isolating anything.