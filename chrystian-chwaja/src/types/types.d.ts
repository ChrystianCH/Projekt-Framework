type PostsRequest = {
    id: number,
    title: string,
    body: string,
    userId?: number,
}

type CommentsRequest = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
}

type UsersRequest = {
    id: number,
    name: string,
    email: string,
}

type ToDosRequest = {
    id: number,
    title: string,
    completed: boolean,
    userId?: number,
}

type PhotosRequest = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl?: string,
}

type CustomError = {
    statusText: string,
    message: string,
}

type AlbumsRequest = {
    userId?: number,
    id: number,
    title: string,
}