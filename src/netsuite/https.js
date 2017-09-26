function parseMethod(method) {
  switch (method.toUpperCase()) {
    case 'GET':
      return https.Method.GET;
    case 'POST':
      return https.Method.POST;
    case 'PUT':
      return https.Method.PUT;
    case 'DELETE':
      return https.Method.DELETE;
  }
}

export function request(body, options) {
  const requestOptions = {
    body,
    headers: options.headers,
    method: parseMethod(options.method),
    url: `https://${options.host}:${options.port}${options.path}`,
  };
  return https.request.promise(requestOptions);
}
