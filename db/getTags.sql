select t.name as name, count(t.name) as count
  from tag t join job_tag jt on t.id = jt.tag_id
  where ${_text} = '' or name like ${_text} and exists(
    select id from job j where jt.job_id = j.id and j.published_at > NOW() - interval '21' day
  )
  group by t.id
  order by count(t.name) desc
