// Interface used with required fields in an API response.
export default interface ResponseBody {
  success: boolean
  status: string
  message?: string
  data?: any
}
