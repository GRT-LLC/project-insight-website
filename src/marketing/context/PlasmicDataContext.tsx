import { PlasmicRootProvider } from "@plasmicapp/loader-react";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { PLASMIC } from "../../plasmic-init";

type ComponentRenderData = Awaited<ReturnType<typeof PLASMIC.maybeFetchComponentData>>;
type PageQuery = Record<string, string | string[]>;

interface PlasmicDataState {
  prefetchedData: ComponentRenderData | undefined;
  pageRoute: string | undefined;
  pageParams: Record<string, string | string[] | undefined>;
  pageQuery: PageQuery | undefined;
}

interface PlasmicDataContextValue extends PlasmicDataState {
  setPlasmicPageData: (data: {
    prefetchedData: ComponentRenderData | null;
    pageRoute: string;
    pageParams?: Record<string, string | string[] | undefined>;
    pageQuery?: PageQuery;
  }) => void;
  clearPlasmicPageData: () => void;
}

const PlasmicDataContext = createContext<PlasmicDataContextValue | undefined>(undefined);

export function usePlasmicData() {
  const ctx = useContext(PlasmicDataContext);
  if (ctx === undefined) {
    throw new Error("usePlasmicData must be used within PlasmicDataProvider");
  }
  return ctx;
}

const initial: PlasmicDataState = {
  prefetchedData: undefined,
  pageRoute: undefined,
  pageParams: {},
  pageQuery: undefined,
};

interface PlasmicDataProviderProps {
  children: ReactNode;
}

export function PlasmicDataProvider({ children }: PlasmicDataProviderProps) {
  const [state, setState] = useState<PlasmicDataState>(initial);

  const setPlasmicPageData = useCallback(
    (data: {
      prefetchedData: ComponentRenderData | null;
      pageRoute: string;
      pageParams?: Record<string, string | string[] | undefined>;
      pageQuery?: PageQuery;
    }) => {
      setState({
        prefetchedData: data.prefetchedData ?? undefined,
        pageRoute: data.pageRoute,
        pageParams: data.pageParams ?? {},
        pageQuery: data.pageQuery,
      });
    },
    []
  );

  const clearPlasmicPageData = useCallback(() => {
    setState(initial);
  }, []);

  const value: PlasmicDataContextValue = {
    ...state,
    setPlasmicPageData,
    clearPlasmicPageData,
  };

  return (
    <PlasmicDataContext.Provider value={value}>
      <PlasmicRootProvider
        loader={PLASMIC}
        prefetchedData={state.prefetchedData ?? undefined}
        pageRoute={state.pageRoute}
        pageParams={state.pageParams}
        pageQuery={state.pageQuery}
      >
        {children}
      </PlasmicRootProvider>
    </PlasmicDataContext.Provider>
  );
}
