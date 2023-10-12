SELECT * FROM project_module_3.service_comments;

-- Get All Services With Rating 
SELECT 
  project_module_3.services.*, 
  IFNULL(subquery.avg_rating, 0) AS avg_rating
FROM project_module_3.services
LEFT JOIN (
  SELECT 
    post_id,
    ROUND(AVG(rating), 1) AS avg_rating
  FROM project_module_3.service_comments
  WHERE project_module_3.service_comments.user_role_id NOT IN (1, 2)
  GROUP BY post_id
) AS subquery
ON project_module_3.services.id = subquery.post_id;