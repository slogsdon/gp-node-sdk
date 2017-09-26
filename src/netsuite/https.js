function parseMethod(method) {
  switch (method.toUpperCase()) {
    case 'GET':
      return http.Method.GET;
    case 'POST':
      return http.Method.POST;
    case 'PUT':
      return http.Method.PUT;
    case 'DELETE':
      return http.Method.DELETE;
  }
}

export function request(body, options) {
  const requestOptions = {
    body,
    headers: options.headers,
    method: parseMethod(options.method),
    url: `https://${options.host}:${options.port}${options.path}`,
  };
  return http.request.promise(requestOptions);
}
