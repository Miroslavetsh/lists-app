export default function getApiPath(route: string): string {
  return process.env.REACT_APP_API_URL + route
}
