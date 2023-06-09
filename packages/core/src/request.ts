export type FetchRequest = Omit<Parameters<typeof fetch>[1], 'body'> & {
  url?: string
  body: object
}

export const requestDefaults = {
  method: 'POST'
}

export const send = async (requestSource: FetchRequest) => {
  const request = Object.assign(requestDefaults, requestSource) as unknown as Omit<FetchRequest, 'body'> & {
    url: string
    body?: string
  }

  if( request.body ) {
    request.body = JSON.stringify(request.body)
  }

  const response = await fetch(request.url)
  return response
}
