export async function getFont(
  font: string,
  weights = [400, 500, 700]
): Promise<ArrayBuffer[]> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weights.join(';')}&display=swap`;
  
  const css = await (
    await fetch(API, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text();

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  
  if (!resource) return [];

  const res = await fetch(resource[1]);
  return [await res.arrayBuffer()];
} 