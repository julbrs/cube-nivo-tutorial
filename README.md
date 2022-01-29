# Building a nivo dashboard with Cube

This repository contains files related to the tutorial: _Building a nivo dashboard with Cube_

![Final Dashboard](https://i.imgur.com/7nLVozg.png)

## Getting Started

It's a simple CRA project that is consuming Cube API to render a dashboard using Nivo library.
### Prerequisites

* `node` and `npm`

### Running Cube

Go to https://cubecloud.dev/ and create a new deployment.

### Running React app

Copy the `.env.default` to `.env.local` and provide the correct Cube API URL and a valid Cube Token.

```
npm install
npm start
```

Go to `http://localhost:3000`


## Built With

* [Cube](https://cube.dev/) - The Analytics API for Building Data Applications
* [Nivo](https://nivo.rocks/) - provides supercharged React components to easily build dataviz apps, it's built on top of d3.