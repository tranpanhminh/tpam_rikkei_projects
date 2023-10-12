SELECT * FROM project_module_3.products;
-- truncate project_module_3.products;

use project_module_3;

SELECT
    products.id, products.name, products.description, products.price, products.quantity_stock, post_type_id,
    post_types.name AS post_type,
    vendors.name AS vendor,
    GROUP_CONCAT(product_images.image_url) AS image_url
FROM
    products
JOIN
    product_images ON products.id = product_images.product_id
JOIN
    vendors ON products.vendor_id = vendors.id
JOIN
    post_types ON products.post_type_id = post_types.id
GROUP BY
    products.id, products.name;
    
SELECT * 
FROM project_module_3.products
UNION ALL
SELECT ROUND(AVG(rating), 1) AS avg_rating
FROM project_module_3.product_comments 
WHERE project_module_3.product_comments.post_id = project_module_3.products.id
AND user_role_id NOT IN (1, 2);


SELECT
  p.*, 
  ROUND(AVG(c.rating), 1) AS avg_rating
FROM products p
LEFT JOIN product_comments c ON c.post_id = p.id
WHERE c.user_role_id NOT IN (1, 2)  
GROUP BY p.id;

-- Get All Products With Rating 
SELECT 
  project_module_3.products.*,
  ROUND(AVG(project_module_3.product_comments.rating), 1) AS avg_rating
FROM project_module_3.products  
LEFT JOIN project_module_3.product_comments
ON project_module_3.products.id = project_module_3.product_comments.post_id
WHERE project_module_3.product_comments.user_role_id NOT IN (1, 2) 
OR project_module_3.product_comments.post_id IS NULL
GROUP BY project_module_3.products.id;

-- Get All Products With Rating Cách 2
SELECT 
  project_module_3.products.*, 
  IFNULL(subquery.avg_rating, 0) AS avg_rating
FROM project_module_3.products
LEFT JOIN (
  SELECT 
    post_id,
    ROUND(AVG(rating), 1) AS avg_rating
  FROM project_module_3.product_comments
  WHERE project_module_3.product_comments.user_role_id NOT IN (1, 2)
  GROUP BY post_id
) AS subquery
ON project_module_3.products.id = subquery.post_id;

