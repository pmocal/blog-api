# blog-api

*Public Endpoints*


POST `/auth/login` with JSON body containing "username" and "password"

GET `/posts` which returns all posts

GET `/posts/:postId` returns a post and its comments

GET `/posts/:postId/comments` returns the comments for a post

POST `/posts/:postId/comments/create` creates a comment on a post

GET `/posts/:postId/comments/:commentId` returns a comment from a post

*Private Endpoints*


POST `/posts/create` with JSON body containing "title" and "text", and, optionally, "link" and "timestamp"

DELETE `/posts/:postId` deletes a post

DELETE `/posts/:postId/comments/:commentId` deletes a comment from a post
