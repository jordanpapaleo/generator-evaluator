#Generator Evaluator Project
This project is a node application that creates random math equations then solves them.  It solves the equations in a linear manner like ingoring the order of operation.  It is very similiar to how you would use a normal calculator. 


## Prerequisites
- This project requires NodeJS, GIT, and Mocha.  
  - [Node](https://nodejs.org) uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.   
  - [Git](https://git-scm.com) is a free and open source distributed version control system.  Git should natively be installed on your mac.
  - [Mocha](http://mochajs.org/) is needs to be installed globally to run the unit tests.
    - Run the following in your terminal ```npm install -g mocha```  
    - There is a possibility that you will need to use the ```sudo npm install -g mocha``` command if you do not have your permissions setup for global installs
- All other dependencies are installed via [NPM](https://www.npmjs.com/) during the Getting Started instructions


## Getting Started
1. Open up your bash terminal
1. Clone the git repository to your local computer<br> ```git clone https://github.com/jordanpapaleo/generator-evaluator.git```
1. Navigate into the root of the project<br> ```cd generator-evaluator```
1. Install the dependencies and build the project<br> ```npm install```
1. Run from you terminal<br> ```./index.js```
1. There is an optinal flag you can use to increase the number of equations to solve<br> ```./index.js --i=50```
