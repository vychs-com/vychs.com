import api, { wrapGetResponse } from '../helpers/api'

export const getProjectsList = async () => {
    return wrapGetResponse(await api.get('/projects'))
}

export const getProjectUsageStats = async (slug: string | undefined) => {
    return wrapGetResponse(await api.get(`/${slug}/stats`))
}
