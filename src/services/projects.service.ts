import api, { wrapGetResponse } from '../helpers/api'

export const getProjectsList = async () => {
    return wrapGetResponse(await api.get('/projects'))
}
