<h1 align="center">🚀</h1>
<h3 align="center">Todo Node</h3>

<p align="center">
    Todo application using node
</p>

## Table of Contents

* [Installation](#installation)
* [Developing](#developing)
* [Coding standards](#coding-standards)

## Installation

### 1. Clone the repository

Using HTTPS

```bash
git clone https://github.com/AlbertHernandez/todo-node.git
```

Using SSH

```bash
git clone git@github.com:AlbertHernandez/todo-node.git
```

### 2. Create the .env

Create a copy of the `.env.example` named `.env`

## Developing

This project use docker to run the app. If you don't have it you will need to install it in your machine. You can see how [(here)](https://docs.docker.com/get-docker/)

Run the following commands
```bash
$ chmod +x wait-for-it.sh
```

```bash
$ docker-compose up
```

Now everything should be ready to start to develop.

### Debugging

#### Webstorm

1.1. Open edit configuration
1.2. Create a new Attach to Node.js/Chrome profile
1.3. Add as Host: 0.0.0.0
1.4. Add as Port: 56745
1.5. Select Reconnect automatically

### Coding standards

Make sure you have environment, that supports eslint / prettier.
The git hooks will ensure for violation of the standards.
