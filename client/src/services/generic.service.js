import instance from '@/plugins/axios'

export const request = async ({url, method, data = {}}) =>{
  const response = await instance[method](url, data)
  return response
}