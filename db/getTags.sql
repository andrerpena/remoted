select t.name as name, count(t.name) as count
  from tag t join job_tag jt on t.id = jt.tag_id
  where ${_text} = '' or name like ${_text}
  group by t.id
  order by count(t.name) desc