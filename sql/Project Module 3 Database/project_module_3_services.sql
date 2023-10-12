SELECT * FROM project_module_3.services;

truncate project_module_3.services;

SELECT
    services.id, services.name, services.description, services.price, services.service_image, services.created_at, services.updated_at,
    working_times.morning_time AS morning_time,
	working_times.afternoon_time AS afteroon_time,
    post_types.name AS post_type
FROM
    services
JOIN
    working_times ON services.working_time_id = working_times.id
JOIN
    post_types ON services.post_type_id = post_types.id
WHERE services.id = 1
GROUP BY
    services.id, services.name
