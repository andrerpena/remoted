select j.public_id from job j
where j.published_at > NOW() - interval '21' day