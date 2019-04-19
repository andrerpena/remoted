export interface IndexQuery {
  tag: string;
  // default filters
  salary: boolean;
  regionfree: boolean;
  // location
  nousonly: boolean;
  nonorthamericaonly: boolean;
  noukonly: boolean;
  noeuropeonly: boolean;
  // source
  stackoverflow: boolean;
  weworkremotely: boolean;
  authenticjobs: boolean;
}
