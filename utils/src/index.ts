import { graphResponse, LocalizedString, pullRequestGraphql, Repository } from "./types"
import projects from "./projects.json"

declare global {
    interface Map<K, V> {
        getOrInsert(key: K, defaultValue: V): V;
    }
}

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

export async function fetchMany<T>(
    token: string,
    query: string,
    initVariables: Record<string, any>,
    path: string[]
) {
    let hasNextPage = true
    let cursor = null

    let jsonResponses: T[] = []

    while (hasNextPage) {
        let variables = {
            ...initVariables,
            cursor
        }
        let body = JSON.stringify({
            query,
            variables
        })

        let options = {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body
        }
        const response = await fetch(GITHUB_GRAPHQL_URL, options)
        const jsonResponse: graphResponse<T> = await response.json()

        let data: any = jsonResponse.data
        for (let p of path) {
            data = data[p]
        }

        hasNextPage = data.pageInfo.hasNextPage
        cursor = data.pageInfo.endCursor
        jsonResponses = [...jsonResponses, ...data.nodes]
    }

    return jsonResponses
}

export async function fetchContributions(token: string): Promise<Repository[]> {
    let query = `
            query ($queryString: String!, $cursor: String) {
                search(query: $queryString, type: ISSUE, first: 100, after: $cursor) {
                    nodes { 
                        ... on PullRequest {
                            title
                            url
                            repository {
                                owner {
                                    avatarUrl
                                    login
                                }
                                id
                                url
                                name
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        `
    let variables = {
        "queryString": "is:pr is:merged author:AquaBx -user:AquaBx  -org:AquaBxSchool -org:Cours-ESIR -org:BDE-ISATI -org:gauchedinternet",
    }

    let jsonResponses = await fetchMany<pullRequestGraphql>(token, query, variables, ["search"])

    let contributions = new Map<string, Repository>()

    jsonResponses.forEach(({ title, url, repository }) => {
        const repo = contributions.getOrInsert(repository.id, {
            complete: true,
            link:repository.url,
            id:repository.id,
            name:repository.name,
            owner:repository.owner,
            isPrivate: false,
            pullRequests: []
        })
        repo.pullRequests.push({
            name: title,
            link: url,
            ...((projects as Record<string, any>)[repository.id] || {})
        })
    });
    return Array.from(contributions.values())
}

export async function fetchOwnedProjects(token: string): Promise<Repository[]> {
    let query = `
        query ($cursor: String) {
            viewer {
                repositories(first: 100, after: $cursor, 
                affiliations: [OWNER],
                orderBy: {field: UPDATED_AT, direction: DESC}) {
                    nodes {
                        owner {
                           avatarUrl
                            login
                        }
                        id
                        name
                        description
                        url
                        isPrivate
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
    `

    let variables = {}
    let jsonResponses = await fetchMany<{
        id: string
        name: string
        description: string
        owner: {
            login: string
            avatarUrl: string
        }
        url: string
        isPrivate: boolean
    }>(token, query, variables, ["viewer", "repositories"])

    return jsonResponses.map(({ id, name, owner, description, url, isPrivate }) => {
        return {
            id,
            name,
            isPrivate,
            link: url,
            pullRequests: [],
            owner,
            complete: id in projects,
            ...((projects as Record<string, any>)[id] || {})
        }
    })
}

export async function fetchOwnedProjectsOrganisation(token: string): Promise<Repository[]> {
    let query = `
        query ($cursor: String) {
            viewer {
                repositories(first: 100, after: $cursor, 
                    affiliations: [COLLABORATOR, ORGANIZATION_MEMBER],
                orderBy: {field: UPDATED_AT, direction: DESC}) {
                    nodes {
                        owner {
                           avatarUrl
                            login
                        }
                        id
                        name
                        description
                        url
                        isPrivate
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
    `

    let variables = {}
    let jsonResponses = await fetchMany<{
        id: string
        name: string
        description: string
        owner: {
            login: string
            avatarUrl: string
        }
        url: string
        isPrivate: boolean
    }>(token, query, variables, ["viewer", "repositories"])

    return jsonResponses.map(({ id, name, owner, description, url, isPrivate }) => {
        return {
            id,
            name,
            isPrivate,
            link: url,
            pullRequests: [],
            owner,
            complete: id in projects,
            ...((projects as Record<string, any>)[id] || {})
        }
    })
}

export function getLocalizedValue(localized: LocalizedString | undefined, lang: string): string {
    if (!localized) return "";
    return localized[lang] || localized["en"] || Object.values(localized)[0] || "";
}

export function processPosts(posts: Repository[], lang: string) {
    return posts.map(p => {
        return {
            ...p,
            description: getLocalizedValue(p.description, lang),
        } ;
    })
}

async function fetchNodes(token: string, ids: string[]): Promise<any[]> {
    if (ids.length === 0) return [];

    let query = `
        query ($ids: [ID!]!) {
            nodes(ids: $ids) {
                ... on Repository {
                    owner {
                        __typename
                        avatarUrl
                        login
                    }
                    id
                    name
                    description
                    url
                    isPrivate
                }
            }
        }
    `

    let variables = { ids }
    let body = JSON.stringify({ query, variables })
    let options = {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`,
            'content-type': 'application/json'
        },
        body
    }
    const response = await fetch(GITHUB_GRAPHQL_URL, options)
    const jsonResponse = await response.json()
    if (jsonResponse.errors) {
        console.error("GraphQL errors fetching missing nodes:", jsonResponse.errors)
        return []
    }
    return (jsonResponse.data?.nodes || []).filter(Boolean)
}

export async function fetchProjects(token: string, lang: string) {
    const contributions = await fetchContributions(token)
    const ownedProjects = await fetchOwnedProjects(token)
    const ownedProjectsOrganisation = await fetchOwnedProjectsOrganisation(token)

    const allFetchedIds = new Set([
        ...contributions.map(p => p.id),
        ...ownedProjects.map(p => p.id),
        ...ownedProjectsOrganisation.map(p => p.id)
    ])

    const missingIds = Object.keys(projects).filter(id => id && !allFetchedIds.has(id))
    const missingNodes = await fetchNodes(token, missingIds)

    missingNodes.forEach(({ id, name, owner, description, url, isPrivate }) => {
        const repo: Repository = {
            id,
            name,
            isPrivate,
            link: url,
            pullRequests: [],
            owner,
            complete: true,
            ...((projects as Record<string, any>)[id] || {})
        }

        if (owner.login === "AquaBx") {
            ownedProjects.push(repo)
        } else if (owner.__typename === "Organization") {
            ownedProjectsOrganisation.push(repo)
        } else {
            contributions.push(repo)
        }
    })

    const contributionsProcessed = processPosts(contributions, lang)
    const ownedProjectsProcessed = processPosts(ownedProjects, lang)
    const ownedProjectsOrganisationProcessed = processPosts(ownedProjectsOrganisation, lang)

    return {
        contributions: contributionsProcessed,
        ownedProjects: ownedProjectsProcessed,
        ownedProjectsOrganisation: ownedProjectsOrganisationProcessed
    }
}