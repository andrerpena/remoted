export interface IndexQuery {
  filters: boolean;
  tag: string;
  // default filters
  salary: boolean;
  anywhere: boolean;
  // location
  nousonly: boolean;
  nonorthamericaonly: boolean;
  noeuropeonly: boolean;
  // source
  stackoverflow: boolean;
  weworkremotely: boolean;
  authenticjobs: boolean;
  company: string;
}
