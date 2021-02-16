import instance from '@/plugins/axios/axios'

export const request = async ({url, method, data = {}}) =>{
  const response = await instance[method](url, data)
  return response
}