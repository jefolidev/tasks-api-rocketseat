export function buildRoutePath(path) {
  const routeParameterRegex = /:([a-zA-Z]+)/g
  const routeWithParams = path.replaceAll(
    routeParameterRegex,
    '(?<$1>[a-z0-9\\-_]+)'
  )

  return new RegExp(`^${routeWithParams}(?<query>\\?(.*))?$`)
}
