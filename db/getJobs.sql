-- Parameters
-- _limit
-- _offset
-- _tag
-- _anywhere
-- _excludeCountries
-- _excludeRegions
-- _salary
-- _sources
-- _companyId
select u.*,
       ld.worldwide_confirmed as loc_worldwide_confirmed,
       ld.accepted_regions as loc_accepted_regions,
       ld.accepted_countries as loc_accepted_countries,
       ld.timezone_min as loc_timezone_min,
       ld.timezone_max as loc_timezone_max,
       ld.description as loc_description,
       ld.headquarters_location as loc_headquarters_location

from job u left outer join location_details ld on u.location_details_id = ld.id
where (
              (${_tag} is null or exists(
                      select t.id
                      from job_tag jt
                               join "tag" t on jt.tag_id = t.id
                      where jt.job_id = u.id
                        and t.name = ${_tag}
                  ))
              and (
                      ${_anywhere} is null
                      or (ld.accepted_countries is null and ld.accepted_regions is null)
                  )
              and (
                      ${_excludeCountries} is null
                      or ld.accepted_countries is null or not (ld.accepted_countries && (${_excludeCountries}::varchar[]))
                  )
              and (
                      ${_excludeRegions} is null
                      or ld.accepted_regions is null or not (ld.accepted_regions && (${_excludeRegions}::varchar[]))
                  )
              and (
                      ${_salary} is not true or
                      u.salary_min is not null
                      or u.salary_max is not null
                      or u.salary_exact is not null
                  )
              and (${_sources} is null or u.source = ANY (${_sources}))

              and (${_companyId} is null or u.company_id = ${_companyId})
          )
order by published_at desc
limit ${_limit} offset ${_offset}
-- $$;
