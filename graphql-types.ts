export type Maybe<T> = T | null;

export interface JobInput {
  title: string;

  description: string;

  tags: string[];

  publishedAt: string;

  companyId: number;

  locationRaw?: Maybe<string>;

  locationRequired?: Maybe<string>;

  locationPreferred?: Maybe<string>;

  locationPreferredTimezone?: Maybe<number>;

  locationPreferredTimezoneTolerance?: Maybe<number>;

  salaryRaw?: Maybe<string>;

  salaryExact?: Maybe<number>;

  salaryMin?: Maybe<number>;

  salaryMax?: Maybe<number>;

  salaryCurrency?: Maybe<string>;

  salaryEquity?: Maybe<boolean>;
}

export interface CompanyInput {
  displayName: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  jobs?: Maybe<(Maybe<Job>)[]>;
}

export interface Job {
  id: string;

  title: string;

  description: string;

  descriptionHtml: string;

  tags: string[];

  relativeUrl: string;

  company?: Maybe<Company>;

  createdAt: string;

  publishedAt: string;

  locationRaw?: Maybe<string>;

  locationRequired?: Maybe<string>;

  locationPreferred?: Maybe<string>;

  locationPreferredTimeZone?: Maybe<number>;

  locationPreferredTimeZoneTolerance?: Maybe<number>;

  salaryRaw?: Maybe<string>;

  salaryExact?: Maybe<number>;

  salaryMin?: Maybe<number>;

  salaryMax?: Maybe<number>;

  salaryCurrency?: Maybe<string>;

  salaryEquity?: Maybe<boolean>;
}

export interface Company {
  id: string;

  name: string;

  displayName: string;

  relativeUrl?: Maybe<string>;
}

export interface Mutation {
  addJob?: Maybe<Job>;

  addCompany?: Maybe<Company>;
}

// ====================================================
// Arguments
// ====================================================

export interface JobsQueryArgs {
  offset?: Maybe<number>;

  limit?: Maybe<number>;
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
    jobs?: JobsResolver<Maybe<(Maybe<Job>)[]>, TypeParent, Context>;
  }

  export type JobsResolver<
    R = Maybe<(Maybe<Job>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, JobsArgs>;
  export interface JobsArgs {
    offset?: Maybe<number>;

    limit?: Maybe<number>;
  }
}

export namespace JobResolvers {
  export interface Resolvers<Context = {}, TypeParent = Job> {
    id?: IdResolver<string, TypeParent, Context>;

    title?: TitleResolver<string, TypeParent, Context>;

    description?: DescriptionResolver<string, TypeParent, Context>;

    descriptionHtml?: DescriptionHtmlResolver<string, TypeParent, Context>;

    tags?: TagsResolver<string[], TypeParent, Context>;

    relativeUrl?: RelativeUrlResolver<string, TypeParent, Context>;

    company?: CompanyResolver<Maybe<Company>, TypeParent, Context>;

    createdAt?: CreatedAtResolver<string, TypeParent, Context>;

    publishedAt?: PublishedAtResolver<string, TypeParent, Context>;

    locationRaw?: LocationRawResolver<Maybe<string>, TypeParent, Context>;

    locationRequired?: LocationRequiredResolver<
      Maybe<string>,
      TypeParent,
      Context
    >;

    locationPreferred?: LocationPreferredResolver<
      Maybe<string>,
      TypeParent,
      Context
    >;

    locationPreferredTimeZone?: LocationPreferredTimeZoneResolver<
      Maybe<number>,
      TypeParent,
      Context
    >;

    locationPreferredTimeZoneTolerance?: LocationPreferredTimeZoneToleranceResolver<
      Maybe<number>,
      TypeParent,
      Context
    >;

    salaryRaw?: SalaryRawResolver<Maybe<string>, TypeParent, Context>;

    salaryExact?: SalaryExactResolver<Maybe<number>, TypeParent, Context>;

    salaryMin?: SalaryMinResolver<Maybe<number>, TypeParent, Context>;

    salaryMax?: SalaryMaxResolver<Maybe<number>, TypeParent, Context>;

    salaryCurrency?: SalaryCurrencyResolver<Maybe<string>, TypeParent, Context>;

    salaryEquity?: SalaryEquityResolver<Maybe<boolean>, TypeParent, Context>;
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
  export type RelativeUrlResolver<
    R = string,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
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
  export type LocationRawResolver<
    R = Maybe<string>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LocationRequiredResolver<
    R = Maybe<string>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LocationPreferredResolver<
    R = Maybe<string>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LocationPreferredTimeZoneResolver<
    R = Maybe<number>,
    Parent = Job,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LocationPreferredTimeZoneToleranceResolver<
    R = Maybe<number>,
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
}

export namespace CompanyResolvers {
  export interface Resolvers<Context = {}, TypeParent = Company> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    displayName?: DisplayNameResolver<string, TypeParent, Context>;

    relativeUrl?: RelativeUrlResolver<Maybe<string>, TypeParent, Context>;
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
  export type RelativeUrlResolver<
    R = Maybe<string>,
    Parent = Company,
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
  Mutation?: MutationResolvers.Resolvers<Context>;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
