export function generateRandomString() {
  const randomValue = `test_${Math.random().toString(36).substring(2, 10)}`;
  return randomValue.toString();
}

