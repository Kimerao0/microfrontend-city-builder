const safeJsonParse = <T>(data: string | null): T | null => {
  try {
    // eslint-disable-next-line no-restricted-syntax
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.error('❌ JSON parsing error:', error);
    return null;
  }
};

export default safeJsonParse;
