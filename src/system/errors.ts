type WithRespBody = {
  response: Record<string, unknown> &
    ({ body: string } | { json: () => Record<string, unknown> });
};

function isReponse(
  r: WithRespBody
): r is { response: { json: () => Record<string, unknown> } } {
  return (
    typeof r.response != "undefined" &&
    "json" in r.response &&
    typeof r.response.json == "function"
  );
}

export class UaskError extends Error {
  constructor(err: { code?: string; message: string }) {
    const constraintErrors = ["SQLITE_CONSTRAINT", "23505"];

    if (constraintErrors.includes(err.code ?? ""))
      super("Failed to register - MUST BE UNIQUE");
    else super(err.message);

    this.name = "UaskError";
  }
}

export function errorMessage(
  message: string,
  statusCode?: number
): { message: string; statusCode: number } {
  return {
    message: message,
    statusCode: statusCode ?? 400,
  };
}

export class UaskClientError extends Error {
  constructor(readonly errors: string[]) {
    super("uask Error");
  }
}

export async function handleClientError(error: WithRespBody): Promise<never> {
  if (isReponse(error)) {
    const json = await error.response.json();
    return Promise.reject(json.errors);
  }
  return Promise.reject(JSON.parse(error.response.body as string).errors);
}
