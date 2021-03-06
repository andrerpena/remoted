export type Maybe<T> = T | null;

export interface TagCountGroupInput {
  name: string;

  tags: string[];
}

export interface JobInput {
  title: string;

  description: string;

  tags: string[];

  publishedAt: string;

  companyId: string;

  locationDetails?: Maybe<LocationDetailsInput>;

  salaryRaw?: Maybe<string>;

  salaryExact?: Maybe<number>;

  salaryMin?: Maybe<number>;

  salaryMax?: Maybe<number>;

  salaryCurrency?: Maybe<string>;

  salaryEquity?: Maybe<boolean>;

  url: string;

  source: string;
}

export interface LocationDetailsInput {
  description?: Maybe<string>;

  acceptedRegions?: Maybe<string[]>;

  acceptedCountries?: Maybe<string[]>;

  timeZoneMin?: Maybe<number>;

  timeZoneMax?: Maybe<number>;

  headquartersLocation?: Maybe<string>;
}

export interface CompanyInput {
  displayName: string;

  imageUrl?: Maybe<string>;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  getJobs?: Maybe<(Maybe<Job>)[]>;

  getJob?: Maybe<Job>;

  getTagCountGroups?: Maybe<(Maybe<TagCountGroup>)[]>;

  getTags?: Maybe<(Maybe<TagCount>)[]>;

  getCompany?: Maybe<Company>;
}

export interface Job {
  id: string;

  title: string;

  description: string;

  descriptionHtml: string;

  tags: string[];

  company?: Maybe<Company>;

  createdAt: string;

  publishedAt: string;

  locationDetails?: Maybe<LocationDetails>;

  salaryRaw?: Maybe<string>;

  salaryExact?: Maybe<number>;

  salaryMin?: Maybe<number>;

  salaryMax?: Maybe<number>;

  salaryCurrency?: Maybe<string>;

  salaryEquity?: Maybe<boolean>;

  url: string;

  source: string;
}

export interface Company {
  id: string;

  name: string;

  displayName: string;

  imageUrl?: Maybe<string>;

  imageUrl20x20?: Maybe<string>;

  locationDetails?: Maybe<LocationDetails>;
}

export interface LocationDetails {
  description?: Maybe<string>;

  worldwideConfirmed?: Maybe<boolean>;

  acceptedRegions?: Maybe<string[]>;

  acceptedCountries?: Maybe<string[]>;

  timeZoneMin?: Maybe<number>;

  timeZoneMax?: Maybe<number>;

  headquartersLocation?: Maybe<string>;
}

export interface TagCountGroup {
  name: string;

  tags: TagCount[];
}

export interface TagCount {
  name: string;

  count: number;
}

export interface Mutation {
  addJob?: Maybe<Job>;

  addCompany?: Maybe<Company>;
}

// ====================================================
// Arguments
// ====================================================

export interface GetJobsQueryArgs {
  offset?: Maybe<number>;

  limit?: Maybe<number>;

  tag?: Maybe<string>;

  salary?: Maybe<boolean>;

  anywhere?: Maybe<boolean>;

  excludeRegions?: Maybe<string[]>;

  excludeCountries?: Maybe<string[]>;

  sources?: Maybe<string[]>;

  companyId?: Maybe<string>;
}
export interface GetJobQueryArgs {
  id?: Maybe<string>;

  url?: Maybe<string>;
}
export interface GetTagCountGroupsQueryArgs {
  tagGroups: TagCountGroupInput[];
}
export interface GetTagsQueryArgs {
  text?: Maybe<string>;
}
export interface GetCompanyQueryArgs {
  id?: Maybe<string>;

  displayName?: Maybe<string>;
}
export interface AddJobMutationArgs {
  input: JobInput;
}
export interface AddCompanyMutationArgs {
  input: CompanyInput;
}

import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    getJobs?: GetJobsResolver<Maybe<(Maybe<Job>)[]>, TypeParent, Context>;

    getJob?: GetJobResolver<Maybe<Job>, TypeParent, Context>;

    getTagCountGroups?: GetTagCountGroupsResolver<
      Maybe<(Maybe<TagCountGroup>)[]>,
      TypeParent,
      Context
    >;

    getTags?: GetTagsResolver<Maybe<(Maybe<TagCount>)[]>, TypeParent, Context>;

    getCompany?: GetCompanyResolver<Maybe<Company>, TypeParent, Context>;
  }

  export type GetJobsResolver<
    R = Maybe<(Maybe<Job>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetJobsArgs>;
  export interface GetJobsArgs {
    offset?: Maybe<number>;

    limit?: Maybe<number>;

    tag?: Maybe<string>;

    salary?: Maybe<boolean>;

    anywhere?: Maybe<boolean>;

    excludeRegions?: Maybe<string[]>;

    excludeCountries?: Maybe<string[]>;

    sources?: Maybe<string[]>;

    companyId?: Maybe<string>;
  }

  export type GetJobResolver<
    R = Maybe<Job>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetJobArgs>;
  export interface GetJobArgs {
    id?: Maybe<string>;

    url?: Maybe<string>;
  }

  export type GetTagCountGroupsResolver<
    R = Maybe<(Maybe<TagCountGroup>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetTagCountGroupsArgs>;
  export interface GetTagCountGroupsArgs {
    tagGroups: TagCountGroupInput[];
  }

  export type GetTagsResolver<
    R = Maybe<(Maybe<TagCount>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetTagsArgs>;
  export interface GetTagsArgs {
    text?: Maybe<string>;
  }

  export type GetCompanyResolver<
    R = Maybe<Company>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetCompanyArgs>;
  export interface GetCompanyArgs {
    id?: Maybe<string>;

    displayName?: Maybe<string>;
  }
}

export namespace JobResolvers {
  export interface Resolvers<Context = {}, TypeParent = Job> {
    id?: IdResolver<string, TypeParent, Context>;

    title?: TitleResolver<string, TypeParent, Context>;

    description?: DescriptionResolver<string, TypeParent, Context>;

    descriptionHtml?: DescriptionHtmlResolver<string, TypeParent, Context>;

    tags?: TagsResolver<string[], TypeParent, Context>;

    company?: CompanyResolver<Maybe<Company>, TypeParent, Context>;

    createdAt?: CreatedAtResolver<string, TypeParent, Context>;

    publishedAt?: PublishedAtResolver<string, TypeParent, Context>;

    locationDetails?: LocationDetailsResolver<
      Maybe<LocationDetails>,
      TypeParent,
      Context
    >;

    salaryRaw?: SalaryRawResolver<Maybe<string>, TypeParent, Context>;

    salaryExact?: SalaryExactResolver<Maybe<number>, TypeParent, Context>;

    salaryMin?: SalaryMinResolver<Maybe<number>, TypeParent, Context>;

    salaryMax?: SalaryMaxResolver<Maybe<number>, TypeParent, Context>;

    salaryCurrency?: SalaryCurrencyResolver<Maybe<string>, TypeParent, Context>;

    salaryEquity?: SalaryEquityResolver<Maybe<boolean>, TypeParent, Context>;

    url?: UrlResolver<string, TypeParent, Context>;

    source?: SourceResolver<string, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Job, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TitleResolver<R = string, Parent = Job, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DescriptionResolver<
    R = string,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type DescriptionHtmlResolver<
    R = string,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TagsResolver<R = string[], Parent = Job, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CompanyResolver<
    R = Maybe<Company>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = string,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PublishedAtResolver<
    R = string,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LocationDetailsResolver<
    R = Maybe<LocationDetails>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type SalaryRawResolver<
    R = Maybe<string>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type SalaryExactResolver<
    R = Maybe<number>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type SalaryMinResolver<
    R = Maybe<number>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type SalaryMaxResolver<
    R = Maybe<number>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type SalaryCurrencyResolver<
    R = Maybe<string>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type SalaryEquityResolver<
    R = Maybe<boolean>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UrlResolver<R = string, Parent = Job, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SourceResolver<R = string, Parent = Job, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace CompanyResolvers {
  export interface Resolvers<Context = {}, TypeParent = Company> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    displayName?: DisplayNameResolver<string, TypeParent, Context>;

    imageUrl?: ImageUrlResolver<Maybe<string>, TypeParent, Context>;

    imageUrl20x20?: ImageUrl20x20Resolver<Maybe<string>, TypeParent, Context>;

    locationDetails?: LocationDetailsResolver<
      Maybe<LocationDetails>,
      TypeParent,
      Context
    >;
  }

  export type IdResolver<R = string, Parent = Company, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<
    R = string,
    Parent = Company,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type DisplayNameResolver<
    R = string,
    Parent = Company,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ImageUrlResolver<
    R = Maybe<string>,
    Parent = Company,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ImageUrl20x20Resolver<
    R = Maybe<string>,
    Parent = Company,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LocationDetailsResolver<
    R = Maybe<LocationDetails>,
    Parent = Company,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace LocationDetailsResolvers {
  export interface Resolvers<Context = {}, TypeParent = LocationDetails> {
    description?: DescriptionResolver<Maybe<string>, TypeParent, Context>;

    worldwideConfirmed?: WorldwideConfirmedResolver<
      Maybe<boolean>,
      TypeParent,
      Context
    >;

    acceptedRegions?: AcceptedRegionsResolver<
      Maybe<string[]>,
      TypeParent,
      Context
    >;

    acceptedCountries?: AcceptedCountriesResolver<
      Maybe<string[]>,
      TypeParent,
      Context
    >;

    timeZoneMin?: TimeZoneMinResolver<Maybe<number>, TypeParent, Context>;

    timeZoneMax?: TimeZoneMaxResolver<Maybe<number>, TypeParent, Context>;

    headquartersLocation?: HeadquartersLocationResolver<
      Maybe<string>,
      TypeParent,
      Context
    >;
  }

  export type DescriptionResolver<
    R = Maybe<string>,
    Parent = LocationDetails,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type WorldwideConfirmedResolver<
    R = Maybe<boolean>,
    Parent = LocationDetails,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type AcceptedRegionsResolver<
    R = Maybe<string[]>,
    Parent = LocationDetails,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type AcceptedCountriesResolver<
    R = Maybe<string[]>,
    Parent = LocationDetails,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TimeZoneMinResolver<
    R = Maybe<number>,
    Parent = LocationDetails,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TimeZoneMaxResolver<
    R = Maybe<number>,
    Parent = LocationDetails,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type HeadquartersLocationResolver<
    R = Maybe<string>,
    Parent = LocationDetails,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace TagCountGroupResolvers {
  export interface Resolvers<Context = {}, TypeParent = TagCountGroup> {
    name?: NameResolver<string, TypeParent, Context>;

    tags?: TagsResolver<TagCount[], TypeParent, Context>;
  }

  export type NameResolver<
    R = string,
    Parent = TagCountGroup,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TagsResolver<
    R = TagCount[],
    Parent = TagCountGroup,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace TagCountResolvers {
  export interface Resolvers<Context = {}, TypeParent = TagCount> {
    name?: NameResolver<string, TypeParent, Context>;

    count?: CountResolver<number, TypeParent, Context>;
  }

  export type NameResolver<
    R = string,
    Parent = TagCount,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CountResolver<
    R = number,
    Parent = TagCount,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    addJob?: AddJobResolver<Maybe<Job>, TypeParent, Context>;

    addCompany?: AddCompanyResolver<Maybe<Company>, TypeParent, Context>;
  }

  export type AddJobResolver<
    R = Maybe<Job>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, AddJobArgs>;
  export interface AddJobArgs {
    input: JobInput;
  }

  export type AddCompanyResolver<
    R = Maybe<Company>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, AddCompanyArgs>;
  export interface AddCompanyArgs {
    input: CompanyInput;
  }
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers<Context = {}> {
  Query?: QueryResolvers.Resolvers<Context>;
  Job?: JobResolvers.Resolvers<Context>;
  Company?: CompanyResolvers.Resolvers<Context>;
  LocationDetails?: LocationDetailsResolvers.Resolvers<Context>;
  TagCountGroup?: TagCountGroupResolvers.Resolvers<Context>;
  TagCount?: TagCountResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
