export type ReleaseInfo = {
  name: string;
  version: string;
  tag: string;
  publishedAt: string;
  fileName: string;
  size: number;
  downloadUrl: string;
  releaseUrl: string;
  sha256: string;
  notes: string;
  prerelease: boolean;
};

export const FALLBACK_RELEASE: ReleaseInfo = {
  name: "FingerprintLauncher v1.1.0",
  version: "1.1.0",
  tag: "v1.1.0",
  publishedAt: "2026-07-31T12:58:35Z",
  fileName: "FingerprintLauncher_Setup_1.1.0.exe",
  size: 23224952,
  downloadUrl:
    "https://github.com/dedovk/fingerprint-launcher/releases/download/v1.1.0/FingerprintLauncher_Setup_1.1.0.exe",
  releaseUrl: "https://github.com/dedovk/fingerprint-launcher/releases/tag/v1.1.0",
  sha256: "DBFC37AF918EED2AF819B719D91323A9FD9EC18BDEB6066533286EFF4DF5E74F",
  notes: `FingerprintLauncher v1.1.0 is a stability and maintainability update.

## Highlights

- Improved cancellation and shutdown handling for fingerprint capture workers.
- Added persistent diagnostics for application, background thread, Qt, and native failures.
- Added a complete privacy policy and official website links.
- Expanded automated test coverage and internal architecture improvements.
- Remains compatible with configurations created in v1.0.0.

## Requirements

- Windows 10 or Windows 11
- A Windows Hello-compatible fingerprint reader
- At least one fingerprint enrolled in Windows Hello`,
  prerelease: false,
};

type GitHubAsset = {
  name?: string;
  size?: number;
  browser_download_url?: string;
};

type GitHubRelease = {
  name?: string;
  tag_name?: string;
  html_url?: string;
  published_at?: string;
  body?: string;
  draft?: boolean;
  prerelease?: boolean;
  assets?: GitHubAsset[];
};

const RELEASE_CACHE_KEY = "fingerprint-launcher-releases-v3";
const RELEASE_CACHE_TTL = 5 * 60 * 1000;

function parseRelease(release: GitHubRelease): ReleaseInfo | null {
  const installer = release.assets?.find((asset) =>
    asset.name?.toLowerCase().endsWith(".exe"),
  );

  if (
    release.draft ||
    !release.tag_name ||
    !release.published_at ||
    !release.html_url ||
    !installer?.name ||
    !installer.browser_download_url ||
    typeof installer.size !== "number"
  ) {
    return null;
  }

  const checksum =
    release.body?.match(/\b[A-Fa-f0-9]{64}\b/)?.[0]?.toUpperCase() ?? "";

  return {
    name: release.name || `FingerprintLauncher ${release.tag_name}`,
    version: release.tag_name.replace(/^v/i, ""),
    tag: release.tag_name,
    publishedAt: release.published_at,
    fileName: installer.name,
    size: installer.size,
    downloadUrl: installer.browser_download_url,
    releaseUrl: release.html_url,
    sha256: checksum,
    notes: release.body?.trim() || "Release notes are available on GitHub.",
    prerelease: Boolean(release.prerelease),
  };
}

async function githubRequest<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`https://api.github.com/repos/dedovk/fingerprint-launcher${path}`, {
    signal,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub release request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function readReleaseCache(): ReleaseInfo[] | null {
  if (typeof window === "undefined") return null;

  try {
    const cached = JSON.parse(window.localStorage.getItem(RELEASE_CACHE_KEY) ?? "null") as {
      expiresAt?: number;
      releases?: ReleaseInfo[];
    } | null;
    if (
      cached?.expiresAt &&
      cached.expiresAt > Date.now() &&
      Array.isArray(cached.releases) &&
      cached.releases.length > 0
    ) {
      return cached.releases;
    }
  } catch {
    return null;
  }

  return null;
}

function writeReleaseCache(releases: ReleaseInfo[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      RELEASE_CACHE_KEY,
      JSON.stringify({ expiresAt: Date.now() + RELEASE_CACHE_TTL, releases }),
    );
  } catch {
    // The live GitHub response still works when browser storage is unavailable.
  }
}

export async function fetchAllReleases(signal?: AbortSignal): Promise<ReleaseInfo[]> {
  const cachedReleases = readReleaseCache();
  if (cachedReleases) return cachedReleases;

  const releases = await githubRequest<GitHubRelease[]>("/releases?per_page=100", signal);
  const parsedReleases = releases
    .map(parseRelease)
    .filter((release): release is ReleaseInfo => release !== null);

  const result = parsedReleases.length > 0 ? parsedReleases : [FALLBACK_RELEASE];
  writeReleaseCache(result);
  return result;
}

export async function fetchLatestRelease(signal?: AbortSignal): Promise<ReleaseInfo> {
  const releases = await fetchAllReleases(signal);
  return releases.find((release) => !release.prerelease) ?? releases[0];
}

export function formatFileSize(bytes: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "megabyte",
    unitDisplay: "short",
    maximumFractionDigits: 1,
  }).format(bytes / 1_000_000);
}
