export type LocalizedString = Partial<Record<string, string>>

export type Repository = {
    id: string
    link?: string
    homepage?: string
    complete: boolean,
    name: string
    owner: {
        login: string
        avatarUrl: string
    }
    categories?: { [key: string]: string[] }
    description?: LocalizedString,
    isPrivate: boolean,
    pullRequests: {
        "title": string,
        "url": string,
    }[]
    // location?: string
    // dates: { start?: string, end?: string }[]
    // slug?: string
    // type?: string
}

export interface graphResponse<T> {
    "data": {
        "search": {
            "nodes": T[]
            "pageInfo": {
                hasNextPage: boolean,
                endCursor: string,
            }
        }
        viewer: {
            "repositories": {
                "nodes": T[]
                "pageInfo": {
                    hasNextPage: boolean,
                    endCursor: string,
                }
            }
        }
    }
}

export interface pullRequestGraphql {
    "repository": {
        "id": string,
        "url": string,
        owner: {
            login: string
            avatarUrl: string
        }
        "name": string,
    },
    "title": string,
    "url": string,
}