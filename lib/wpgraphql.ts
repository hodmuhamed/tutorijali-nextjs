import { logError, logInfo } from './logger'

const WP_GRAPHQL_ENDPOINT =
  process.env.WP_GRAPHQL_ENDPOINT || 'https://admin.go2njemacka.de/graphql'

export interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{
    message?: string | null
    locations?: Array<{ line: number; column: number }>
    path?: string[]
  }>
}

export interface GraphQLFetchOptions {
  revalidate?: number | false
  tags?: string[]
  timeoutMs?: number
}

export async function graphqlFetch<T>(
  query: string,
  variables: Record<string, any> = {},
  options: GraphQLFetchOptions = {}
): Promise<T> {
  logInfo('graphqlFetch START', {
    queryPreview: query.slice(0, 80),
    variables,
  })

  const controller = new AbortController()
  const timeout = options.timeoutMs ?? 8000
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const fetchOptions: RequestInit & { next?: any } = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    }

    if (options.revalidate !== undefined || options.tags) {
      fetchOptions.next = {
        ...(options.revalidate !== undefined && {
          revalidate: options.revalidate,
        }),
        ...(options.tags && { tags: options.tags }),
      }
    }

    const res = await fetch(WP_GRAPHQL_ENDPOINT, fetchOptions)

    if (!res.ok) {
      logError('GraphQL HTTP error', {
        status: res.status,
        statusText: res.statusText,
      })
      return {} as T
    }

    const json: GraphQLResponse<T> = await res.json()

    if (json.errors?.length) {
      logError('GraphQL response errors', {
        errors: json.errors.map(e => ({
          message: e.message ?? 'No message',
          path: e.path,
        })),
      })
    }

    // 🔒 KLJUČNO: NIKAD null, NIKAD throw
    return (json.data ?? {}) as T
  } catch (error: unknown) {
    const safeMessage =
      error instanceof Error
        ? error.message
        : 'Unknown GraphQL fetch error'

    logError('GraphQL fetch failed', {
      message: safeMessage,
    })

    // 🔒 App Router SAFE fallback
    return {} as T
  } finally {
    clearTimeout(timer)
  }
}
