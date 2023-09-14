# DevHub SHARE API


## Description

Welcome to the documentation for our RESTful API, an API we designed for a self-help web developer project.
It offers a "users" and "posts" database (which can be filtered by programming language), as well as "answers" (for answers given to questions from other web developers).
It is built using `REST` standards and is accessible via `standard HTTP` requests whose data is returned in `JSON format`.
Below are the different API features and routes in the application of the CRUD method.


## Endpoints

**Users :**

- Retrieve all users: `GET /users`
- Retrieve a user by ID: `GET /users/:id`
- Create a user: `POST /users`
- Update a user: `PUT /users/:id`
- Delete a user: `DELETE /users/:id`

**Languages :**

- Retrieve all languages: `GET /languages`
- Retrieve a language by ID: `GET /languages/:id`
- Create a language: `POST /languages`
- Update a language: `PUT /languages/:id`
- Delete a language: `DELETE /languages/:id`

**Posts :**

- Retrieve all posts: `GET /posts`
- Retrieve a post by ID: `GET /posts/:id`
- Create a post: `POST /posts`
- Update a post: `PUT /posts/:id`
- Delete a post: `DELETE /posts/:id`

**Answers (to posts) :**

- Retrieve all answers: `GET /answers`
- Retrieve a response by ID: `GET /answers/:id`
- Create an answer: `POST /answers`
- Update an answer: `PUT /answers/:id`
- Delete a response: `DELETE /answers/:id`

**User languages :**

- Retrieve user languages: `GET /user_has_language`
- Retrieve a user's languages by ID: `GET /user_has_language/:id`
- Create a user language: `POST /user_has_language/:id`
- Update a user's language: `PUT /user_has_language/:id`
- Delete a language from a user: `DELETE /user_has_language/:id`


## Example users

### Retrieve all users

Request :

```
GET /users
```

Response :

```
{
    "users": [
        {
            "id": 1, 
            "picture": "image_data_as_a_blob", 
            "pseudo": "SanSan", 
            "firstname": "Sandra", 
            "lastname": "Sansan", 
            "email": "as@example.com",           
            "workplace": "CRC TER", 
            "github": "https://github.com/sansan", 
            "linkedin": "sandra.sansan" 
            "user_text": "Je vous propose mon aide"
            "hashedPassword": "hashed_password
        },
        {
            "id": 2, 
            "picture": "image_data_as_a_blob",
            "pseudo": "Samikate", 
            "firstname": "Karine", 
            "lastname": "Randy", 
            "email": "samiluleo@gmail.com",             
            "workplace": "ABE PACA", 
            "github": "https://github.com/samikate", 
            "linkedin": "karine.randy", 
            "user_text": "Je vous propose mon aide" 
            "hashedPassword": "hashed_password
        }
    ]
},
```

### Retrieve a user by his id

Request :

```
GET /users/1
```

Response :

```
{
    "id": 1,
    "picture": "image_data_as_a_blob",
    "pseudo": "user1",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "workplace": "Workplace",
    "github": "github.com/user1",
    "linkedin": "linkedin.com/user1",
    "user_text": "Passionné de technologie et d'innovation, j'aime explorer de nouveaux domaines et apprendre de nouvelles compétences. J'ai une forte expérience en développement de logiciels et en gestion de projets, et je suis toujours à la recherche de nouveaux défis excitants.",
    "hashedPassword": "hashed_password"
},
```

### Add user

Request :

```
POST /users
```

With a request body :

```
{
    "picture": "image_data_as_a_blob",
    "nickname": "DoDo38",
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@email.com",
    "workplace": "COGC",
    "github": "https://github.com/johndoe",
    "linkedin": "John.Doe",
    "user_text": "I offer my help",
    "hashedPassword": "hashed_password"
},
```

### Update user

Request :

```
PUT /users/3
```


## Error management

For error handling, the API should return as much information as possible for the developer to understand the error and make a fix, but also enough information for the developer to use in their program to return functional issues.
For example in a Rest API, it is important that the different error cases are explained:

```
400 - BadRequest: The request is malformed.
404 - NotFound: The resource binkup can't be found
401 - Unauthorized: The user is not authenticated.
403 - Forbidden: The user is not authorized to access the resource backup.
503 - Service unailable: The user connot acces cause an available service.
```


## Management of filters by URL

- Posts by user: `GET /posts/user/:userId`
- Posts by language: `GET /posts/language/:languageId`
- Answers by post: `GET/answers/post/:postId`


## Typing

```
CREATE TABLE IF NOT EXISTS `user` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `picture` BLOB NULL,
   `pseudo` VARCHAR(255) NOT NULL,
   `firstname` VARCHAR(255) NULL,
   `lastname` VARCHAR(255) NULL,
   `email` VARCHAR(255) NOT NULL,
   `workplace` VARCHAR(255) NULL,
   `github` VARCHAR(255) NULL,
   `linkedin` VARCHAR(255) NULL,
   `user_text` LONGTEXT NULL,
   `hashedpassword` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`))
ENGINE=InnoDB;
```

```
CREATE TABLE IF NOT EXISTS `language` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `language_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
```

```
CREATE TABLE IF NOT EXISTS `post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tag` VARCHAR(255) NOT NULL,
  `post_text` LONGTEXT NOT NULL,
  `language_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `language_id`, `user_id`),
  CONSTRAINT `fk_post_language1`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
```

```
CREATE TABLE IF NOT EXISTS `answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_text` LONGTEXT NOT NULL,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP,  
  PRIMARY KEY (`id`, `post_id`, `user_id`),
  CONSTRAINT `fk_answer_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_answer_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE  CASCADE)
ENGINE = InnoDB;
```

```
CREATE TABLE IF NOT EXISTS `user_has_language` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `language_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `language_id`),
  CONSTRAINT `fk_user_has_language_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_language_language1`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
```

```
INSERT INTO language (id , language_name)
VALUES
(1, 'HTML'),
(2, 'CSS'),
(3, 'JAVASCRIPT'),
(4, 'JAVA'),
(5, 'PYTHON'),
(6, 'C#'),
(7, 'AUTRE');
```
