import { PlasmicComponent } from "@plasmicapp/loader-react";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams, Navigate } from "react-router-dom";
import { usePlasmicData } from "../context/PlasmicDataContext";
import { PLASMIC } from "../../plasmic-init";

/**
 * Catch-all page that autoloads Plasmic pages by path.
 * Uses the root PlasmicRootProvider (via PlasmicDataContext) so we don't nest providers.
 */
export function PlasmicPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pathname = location.pathname;
  const { setPlasmicPageData, clearPlasmicPageData } = usePlasmicData();

  const [pageData, setPageData] = useState<Awaited<ReturnType<typeof PLASMIC.maybeFetchComponentData>> | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    PLASMIC.maybeFetchComponentData(pathname)
      .then((data) => {
        if (!cancelled) {
          setPageData(data);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  // Push prefetched data to root provider (single provider, no nesting)
  useEffect(() => {
    if (pageData != null) {
      const pageQuery: Record<string, string | string[]> = {};
      searchParams.forEach((_value, key) => {
        const all = searchParams.getAll(key);
        pageQuery[key] = all.length > 1 ? all : all[0];
      });
      setPlasmicPageData({
        prefetchedData: pageData,
        pageRoute: pathname,
        pageParams: {},
        pageQuery,
      });
    }
  }, [pageData, pathname, searchParams, setPlasmicPageData]);

  // Clear when leaving Plasmic page so root provider doesn't show stale data
  useEffect(() => {
    return () => clearPlasmicPageData();
  }, [clearPlasmicPageData]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        Loading…
      </div>
    );
  }

  if (pageData == null) {
    return <Navigate to="/" replace />;
  }

  return <PlasmicComponent component={pathname} />;
}
