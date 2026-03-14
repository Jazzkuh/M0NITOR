const BASE = "http://deamon.jazzkuh.com";

export async function daemonGet(path: string): Promise<unknown> {
    const res = await fetch(`${BASE}${path}`, {
        headers: { "X-API-Key": process.env.DEAMON_API_KEY! },
        cache: "no-store",
    });
    return res.json();
}
