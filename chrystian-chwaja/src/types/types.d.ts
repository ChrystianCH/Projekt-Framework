type AlbumsRequest = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbNail?: string,
}

type PostsRequest = {
    userId?: number,
    id: number,
    title: string,
    body: string,
}

type UsersRequest = {
    id: number,
    name: string,
    email: string
}

type CustomError = {
    statusText: string,
    message: string,
}
