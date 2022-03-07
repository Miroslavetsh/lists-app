export default function getApiPath(route: string): string {
  console.log(process.env.REACT_APP_API_URL + route)

  return process.env.REACT_APP_API_URL + route
}
