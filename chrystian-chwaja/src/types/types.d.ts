type AlbumsRequest = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumNailUrl?: string,
}
type PostsRequest = {
    userId: number,
    id: number,
    title: string,
    body: string,
}