import api, { wrapResponse } from '../helpers/api'

export const getProjectsList = async () => {
    return wrapResponse(await api.get('/projects'))
}

export const getProjectUsageStats = async (slug: string | undefined) => {
    return wrapResponse(await api.get('/statistics/usage/' + slug))
}
