SELECT * FROM project_module_3.product_comments;

SELECT post_id, ROUND(AVG(rating), 1) AS avg_rating
FROM project_module_3.product_comments
WHERE user_role_id NOT IN (1, 2)
GROUP BY post_id;


SELECT post_id, ROUND(AVG(rating), 1) AS `avg_rating`
FROM project_module_3.product_comments
WHERE project_module_3.product_comments.user_role_id NOT IN (1, 2)
GROUP BY project_module_3.product_comments.post_id

INSERT INTO project_module_3.product_comments(
VALUES (1,1,"I'm really impressed with this product. It's well-made and exceeded my expectations.",5),
(1,2,"The quality of this product is outstanding. I couldn't be happier with my purchase.",5),
(1,4,"This product is a game-changer. It's made my life so much easier and more convenient.",4),
(1,5,"I've been using this product for a while now, and it's still in perfect condition. Great durability!",3),
(1,6,"What a fantastic product! It's worth every penny and has improved my daily routine.",4),
(2,2,"I love the design of this product. It's sleek and stylish, adding a touch of elegance to my space.",5),
(2,4,"This product has become an essential part of my daily life. I can't imagine living without it.",5),
(2,7,"I purchased this product as a gift, and the recipient absolutely loved it. Great choice!",4),
(2,8,"The performance of this product is top-notch. It delivers on its promises and then some.",4),
(2,9,"I'm so glad I found this product. It's made a noticeable difference in my overall well-being.",4),
(3,4,"This product is user-friendly and easy to set up. No complicated instructions to worry about.",5),
(3,5,"I appreciate the eco-friendly materials used in this product. It's a responsible choice.",4),
(3,6,"The customer service for this product is excellent. They were quick to address my concerns.",3),
(3,7,"I'm amazed at how versatile this product is. It can be used in so many different ways.",2),
(3,8,"The packaging was great, and the product arrived in perfect condition. A+ for presentation.",4),
(4,9,"This product is a great value for the quality you receive. I highly recommend it.",4),
(4,4,"I've recommended this product to all my friends. It's a must-have for anyone.",5),
(4,5,"The product's performance has exceeded my expectations. It's a reliable choice.",4),
(4,6,"I've used similar products before, but this one stands out for its durability and efficiency.",3),
(4,7,"I'm thoroughly satisfied with this purchase. This product has made my life easier and more enjoyable.",4),
(5,8,"I've been using this product for months, and it still works like new. Impressive longevity!",5),
(5,9,"I can't believe how affordable this product is for the quality you get. It's a steal!",4),
(5,4,"This product is a real game-changer. It's made my daily tasks so much easier and more efficient.",3),
(5,5,"The attention to detail in the design of this product is remarkable. It's both functional and beautiful.",45050),
(5,6,"I bought this product on a friend's recommendation, and it didn't disappoint. Great purchase!",45049),
(6,7,"The customer support for this product is exceptional. They go above and beyond to assist you.",45050),
(6,8,"I appreciate the thought put into making this product user-friendly. It's hassle-free.",45048),
(6,9,"The product's performance is consistent and reliable. It's a trustworthy choice.",45050),
(6,4,"I'm really happy with this purchase. This product has become an indispensable part of my life.",5),
(6,5,"The craftsmanship of this product is outstanding. You can tell it's built to last.",4),