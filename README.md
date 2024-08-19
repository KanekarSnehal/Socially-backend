
# Socially

Socially is a platform where people can share their thoughts with their all of their friends and explore what other people's point of view. People can also converse with each other and express their opinions.

## Tech Stack

**Frontend:** ReactJS, React Router, Redux Tooklkit, Tailwind CSS

**Backend:** ExpressJS, JWT

**ORM:** Sequelize

**Database:** MySQL

## How to run the app locally?

### Using npm
```bash
$ git clone https://github.com/KanekarSnehal/Socially-backend.git
$ cd Socially-backend
$ npm install
$ npm start
```

## Technical Documentation

## Functional Requirements

### 1. **Home Page**
   - **View Posts:** Users can see posts from people they follow on their home page.
   - **Follow Menu Bar:** Users are presented with suggestions of other users to follow.

### 2. **Bookmark Page**
   - **View Bookmarked Posts:** Users can view all the posts they have bookmarked.

### 3. **User Profile Page**
   - **Edit Profile:** Users can edit their profile details, including profile photo, bio, and external link.

### 4. **Other Users' Profile Page**
   - **View Profile:** Users can view the profile page of other users.
   - **View Posts:** Users can see the posts made by other users.
   - **Follow/Unfollow:** Users can follow or unfollow other users from their profile page.

### 5. **Posts**
   - **Create Post:** Users can create a post with photos and emojis.
   - **Update Post:** Users can update their existing posts.
   - **Delete Post:** Users can delete their posts.
   - **Like Post:** Users can like a post.
   - **Bookmark Post:** Users can bookmark posts for later viewing.

### 6. **Comments**
   - **Add Comment:** Users can add comments to posts, including the use of emojis.
   - **Update Comment:** Users can update their own comments.
   - **Delete Comment:** Users can delete their comments.

### 7. **User Authentication Pages**
   - **Signup:** Users can create an account by signing up with their email and password.
   - **Login:** Users can log in to their account using their credentials.



### Libraries Used
**ExpressJS:** Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

**Sequelize:** Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more.

**JWT (JSON Web Tokens):** [jwt](https://jwt.io/) - JWTs are used for authentication within our system.

### Database Schema
For the database schema, please refer to the attached Entity-Relationship (ER) diagram. This diagram illustrates the structure of our database, including the relationships between different entities and their attributes.
[ER diagram](https://dbdiagram.io/d/SOCIALLY-6593af34ac844320ae149118)


## Related

Here is the link to frontend repo.

[socially-frontend](https://github.com/KanekarSnehal/Socially)
