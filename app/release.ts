export type ReleaseInfo = {
  version: string;
  tag: string;
  publishedAt: string;
  fileName: string;
  size: number;
  downloadUrl: string;
  releaseUrl: string;
  sha256: string;
};

export const FALLBACK_RELEASE: ReleaseInfo = {
  version: "1.0.0",
  tag: "v1.0.0",
  publishedAt: "2026-07-27T15:55:54Z",
  fileName: "FingerprintLauncher_Setup_1.0.0.exe",
  size: 23211047,
  downloadUrl:
    "https://github.com/dedovk/fingerprint-launcher/releases/download/v1.0.0/FingerprintLauncher_Setup_1.0.0.exe",
  releaseUrl: "https://github.com/dedovk/fingerprint-launcher/releases/tag/v1.0.0",
  sha256: "23CA1A0D610A325933F85A37E2D36FD7A0B9BA34C350CA08432F7AE6616A9742",
};

type GitHubAsset = {
  name?: string;
  size?: number;
  browser_download_url?: string;
};

type GitHubRelease = {
  tag_name?: string;
  html_url?: string;
  published_at?: string;
  body?: string;
  assets?: GitHubAsset[];
};

export async function fetchLatestRelease(signal?: AbortSignal): Promise<ReleaseInfo> {
  const response = await fetch(
    "https://api.github.com/repos/dedovk/fingerprint-launcher/releases/latest",
    {
      signal,
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub release request failed with ${response.status}`);
  }

  const release = (await response.json()) as GitHubRelease;
  const installer = release.assets?.find((asset) =>
    asset.name?.toLowerCase().endsWith(".exe"),
  );

  if (
    !release.tag_name ||
    !release.published_at ||
    !release.html_url ||
    !installer?.name ||
    !installer.browser_download_url ||
    typeof installer.size !== "number"
  ) {
    throw new Error("The latest release does not contain a Windows installer");
  }

  const checksum =
    release.body?.match(/\b[A-Fa-f0-9]{64}\b/)?.[0]?.toUpperCase() ??
    FALLBACK_RELEASE.sha256;

  return {
    version: release.tag_name.replace(/^v/i, ""),
    tag: release.tag_name,
    publishedAt: release.published_at,
    fileName: installer.name,
    size: installer.size,
    downloadUrl: installer.browser_download_url,
    releaseUrl: release.html_url,
    sha256: checksum,
  };
}

export function formatFileSize(bytes: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "megabyte",
    unitDisplay: "short",
    maximumFractionDigits: 1,
  }).format(bytes / 1_000_000);
}

