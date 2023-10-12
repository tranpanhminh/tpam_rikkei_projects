SELECT * FROM project_module_3.carts;

use project_module_3;

-- truncate project_module_3.carts;

-- List Data Cart
INSERT INTO project_module_3.carts (user_id, product_id, quantity, price)
VALUES(1,4,1),
(2,4,1),
(3,4,1),
(4,4,1),
(5,4,1),
(1,5,1),
(2,5,2),
(3,5,3),
(4,5,4),
(5,5,5),
(6,5,6),
(1,6,5),
(2,6,5),
(3,6,5),
(4,6,5),
(1,7,1),
(2,7,2),
(3,7,1),
(4,7,2),
(5,8,1),
(6,8,1),
(7,8,2),
(8,8,2);



SELECT *
FROM project_module_3.carts
WHERE user_id = 4;


SELECT user_id, name, SUM(project_module_3.carts.quantity * project_module_3.carts.price) AS `bill`
FROM project_module_3.carts
inner join project_module_3.coupons
WHERE user_id =4 and  150 between 100 and 200
GROUP BY user_id, coupons.name;

SELECT user_id, name, code,
  CASE
    WHEN bill < project_module_3.coupons.min_bill THEN 0  
    ELSE project_module_3.coupons.min_bill
  END AS min_bill,
discount_rate, bill, discounted_amount, total_bill
FROM (
  SELECT user_id, coupons.name, code,min_bill, discount_rate, ROUND(SUM(project_module_3.carts.quantity * project_module_3.carts.price),1) AS `bill`,
  ROUND(SUM(project_module_3.carts.quantity * project_module_3.carts.price * project_module_3.coupons.discount_rate / 100),1) AS `discounted_amount`,
  ROUND(SUM(project_module_3.carts.quantity * project_module_3.carts.price - project_module_3.carts.quantity * project_module_3.carts.price * project_module_3.coupons.discount_rate / 100),1) AS `total_bill`
  FROM project_module_3.carts
  INNER JOIN project_module_3.coupons
  WHERE user_id = 5
  GROUP BY user_id, coupons.name, coupons.code,min_bill, discount_rate
  ORDER BY discount_rate DESC
) AS subquery
WHERE bill > (SELECT min_bill FROM project_module_3.coupons WHERE name = subquery.name) or bill < (SELECT min_bill FROM project_module_3.coupons WHERE name = subquery.name)
LIMIT 1;


SELECT *
FROM project_module_3.carts
WHERE user_id = 4;


-- Lấy thông tin sản phẩm từ bảng carts và products cho user_id cụ thể (user_id = 4)
SELECT c.*, p.quantity_stock
FROM project_module_3.carts AS c
INNER JOIN project_module_3.products AS p ON c.product_id = p.id
WHERE c.user_id = 4;

-- Sau khi lấy thông tin sản phẩm, cập nhật bảng products để giảm số lượng tồn kho (quantity_stock)
UPDATE project_module_3.products AS p
INNER JOIN project_module_3.carts AS c ON p.id = c.product_id
SET p.quantity_stock = p.quantity_stock - c.quantity
WHERE c.user_id = 4;

