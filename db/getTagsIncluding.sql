select t.name, count(t.name)
  from tag t join job_tag jt on t.id = jt.tag_id
  where t.name = ANY(${tags})
  group by t.id
  order by count(t.name) desc