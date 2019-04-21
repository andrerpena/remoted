-- Parameters
-- _limit
-- _offset
-- _tag
-- _regionFree
-- _excludeLocationTags
-- _salary
-- _sources
select *
from job u
where (
              (${_tag} is null or exists(
                      select t.id
                      from job_tag jt
                               join "tag" t on jt.tag_id = t.id
                      where jt.job_id = u.id
                        and t.name = ${_tag}
                  ))
              and (
                      ${_regionFree} is null
                      or (location_tag is null and u.location_required is null)
                  )
              and (
                      ${_excludeLocationTags} is null
                      or location_tag is null or location_tag != ALL (${_excludeLocationTags})
                  )
              and (
                      ${_salary} is not true or
                      u.salary_min is not null
                      or u.salary_max is not null
                      or u.salary_exact is not null
                  )
              and (${_sources} is null or u.source = ANY (${_sources}))
          )
order by published_at desc
limit ${_limit} offset ${_offset}
-- $$;

