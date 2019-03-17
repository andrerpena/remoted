-- Parameters
-- _limit
-- _offset
-- _hasTag
-- _excludeUs
-- _excludeEurope
-- _excludeNorthAmerica
-- _excludeUk
-- _excludeWithoutSalary
-- _excludeStackoverflow
-- _excludeWeWorkRemotely
select *
from job u
where (
          (${_hasTag} is null or exists(
              select t.id
              from job_tag jt
                     join "tag" t on jt.tag_id = t.id
              where jt.job_id = u.id
                and t.name = ${_hasTag}
            ))
          and (
              location_tag is null
              or (
                  (${_excludeUs} is not true or location_tag != 'us-only')
                  and
                  (${_excludeEurope} is not true or not location_tag != 'europe-only')
                  and
                  (${_excludeNorthAmerica} is not true or not location_tag != 'north-america-only')
                  and
                  (${_excludeUk} is not true or not location_tag != 'uk-only')
                )
            )
          and (
              ${_excludeWithoutSalary} is not true or
              u.salary_min is not null
              or u.salary_max is not null
              or u.salary_exact is not null
            )
          and (
              ${_excludeStackoverflow} is not true or not exists(
                select s.id from source s where id = u.id and s.name <> 'stackoverflow'
              )
            )
          and (
              ${_excludeWeWorkRemotely} is not true or not exists(
                select s.id from source s where id = u.id and s.name <> 'we-work-remotely'
              )
            )
        )
order by published_at desc
limit ${_limit} offset ${_offset}
-- $$;

