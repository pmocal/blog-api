# blog-api

If you want to deploy and use this blog API yourself, create a `.env` in the root of the repository which defines the following environment variables: `DB_HOST`, `DB_USER`, `DB_PASS`, and `DB_TABLE`. The repository is designed to use MongoDB.

__*Public Endpoints*__


POST `/auth/login` with JSON body containing "username" and "password"

GET `/posts` which returns all posts

GET `/posts/:postId` returns a post and its comments

GET `/posts/:postId/comments` returns the comments for a post

POST `/posts/:postId/comments/create` creates a comment on a post

GET `/posts/:postId/comments/:commentId` returns a comment from a post

__*Private Endpoints*__


POST `/posts/create` with JSON body containing "title" and "text", and, optionally, "link" and "timestamp"

DELETE `/posts/:postId` deletes a post

DELETE `/posts/:postId/comments/:commentId` deletes a comment from a post

GET `/photos/location/:locationId` gets all pictures tagged at a particular location

POST `/photos/create` with form data containing "location" and file upload "img"
