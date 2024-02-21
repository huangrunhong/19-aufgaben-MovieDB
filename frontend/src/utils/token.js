const decodeTokenPayload = (token) => {
  if (typeof token !== "string")
    throw new Error("Token must be a valid String");
  const [_, payloadBase64] = token.split(".");
  if (!payloadBase64) throw new Error("invalid token format: No Payload");
  const payloadJsonString = atob(payloadBase64);
  const payload = JSON.parse(payloadJsonString);
  return payload;
};

const calcRefreshTokenAfterMs = (token) => {
  const payload = decodeTokenPayload(token);
  const expirationPeriodSeconds = payload.exp - payload.iat;
  const expirationMs = expirationPeriodSeconds * 1000;
  const HALF_MINUTE = 30 * 1000;
  const refreshTokenAfterMs = expirationMs - HALF_MINUTE;
  return refreshTokenAfterMs;
};

export async function doSilentRefresh() {
  try {
    const res = await fetch("http://localhost:9999/users/refreshToken", {
      method: "POST",
      credentials: "include",
    });
    const { success, result, message } = await res.json();

    if (!success) {
      console.log(message);
      throw new Error("Could not refresh token, please login");
    }
    return result.newAccessToken;
  } catch (error) {
    console.log(error);
    throw new Error("Could not refresh token, please login");
  }
}

export function silentRefreshLoop(
  currentAccessToken,
  onSilentRefreshDoneCallback
) {
  const delay = calcRefreshTokenAfterMs(currentAccessToken);
  console.log("delaying silent refresh to", delay, "ms");
  setTimeout(async () => {
    console.log(console.log("doing silent refresh..."));
    const newAccessToken = await doSilentRefresh();
    onSilentRefreshDoneCallback(newAccessToken);

    silentRefreshLoop(newAccessToken, onSilentRefreshDoneCallback);
  }, delay);
}
