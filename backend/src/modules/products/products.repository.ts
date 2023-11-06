import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from './database/entity/products.entity';
import { ProductInterface } from './interface/product.interface';
import { AddProductImagesInterface } from './interface/addProductImages.interface';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';
import { ChangeThumbnailProductInterface } from './interface/changeThumbnail.interface';
import { UpdateProductImageInterface } from './interface/updateProductImage.interface';
import { UpdateProductInterface } from './interface/updateProduct.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsEntity: Repository<ProductsEntity>,
    @InjectRepository(ProductImagesEntity)
    private readonly productImagesEntity: Repository<ProductImagesEntity>,
  ) {}

  // 1. Get All
  async getAllProducts(): Promise<ProductsEntity[]> {
    // return await this.productsEntity.find({
    //   relations: {
    //     vendors: true,
    //     post_types: true,
    //     product_images: true,
    //     product_comments: true,
    //   },
    // });

    const query = `
    SELECT
      products.id,
      products.name,
      products.description,
      products.price,
      products.quantity_stock,
      products.thumbnail_url,
      products.vendor_id,
      products.post_type_id,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT("id", product_images.id, "image_url", product_images.image_url)
        )
        FROM product_images
        WHERE product_images.product_id = products.id
      ) AS product_images,
      ROUND(AVG(product_comments.rating), 1) AS "avg_rating",
      COUNT(product_comments.rating) AS "total_reviews",
      vendors.name AS vendor_name,
      post_types.name AS post_type_name
    FROM products
    LEFT JOIN product_comments ON product_comments.post_id = products.id
    LEFT JOIN users ON product_comments.user_id = users.id
    LEFT JOIN vendors ON vendors.id = products.vendor_id
    LEFT JOIN post_types ON post_types.id = products.post_type_id
    
    WHERE users.role_id NOT IN (1, 2)
    GROUP BY products.id, products.name, products.description, products.price, products.quantity_stock, products.thumbnail_url, products.vendor_id, products.post_type_id
  `;

    return await this.productsEntity.query(query);
  }

  // 2. Get Detail
  async getDetailProduct(id: number): Promise<ProductsEntity> {
    // return await this.productsEntity.findOne({
    //   where: { id: id },
    //   relations: {
    //     vendors: true,
    //     post_types: true,
    //     product_images: true,
    //     product_comments: true,
    //   },
    // });
    const query = `
    SELECT
      products.id,
      products.name,
      products.description,
      products.price,
      products.quantity_stock,
      products.thumbnail_url,
      products.vendor_id,
      products.post_type_id,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT("id", product_images.id, "image_url", product_images.image_url)
        )
        FROM product_images
        WHERE product_images.product_id = products.id
      ) AS product_images,
      ROUND(AVG(product_comments.rating), 1) AS "avg_rating",
      COUNT(product_comments.rating) AS "total_reviews",
      vendors.name AS vendor_name,
      post_types.name AS post_type_name
    FROM products
    LEFT JOIN product_comments ON product_comments.post_id = products.id
    LEFT JOIN users ON product_comments.user_id = users.id
    LEFT JOIN vendors ON vendors.id = products.vendor_id
    LEFT JOIN post_types ON post_types.id = products.post_type_id
    WHERE users.role_id NOT IN (1, 2) AND products.id = ${id} 
    GROUP BY products.id, products.name, products.description, products.price, products.quantity_stock, products.thumbnail_url, products.vendor_id, products.post_type_id
  `;
    return await this.productsEntity.query(query);
  }

  // 2. Get Detail Original
  async getDetail(id: number): Promise<ProductsEntity> {
    return await this.productsEntity.findOne({
      where: { id: id },
    });
  }

  // 3. Add
  async addProduct(
    newProduct: ProductInterface,
  ): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.save(newProduct);
  }

  // Upload Product Image
  async uploadProductImages(
    data: AddProductImagesInterface,
  ): Promise<ProductImagesEntity> {
    return await this.productImagesEntity.save(data);
  }

  // Get Detail Product Image
  async getDetailProductImage(imageId: number): Promise<ProductImagesEntity> {
    return await this.productImagesEntity.findOne({ where: { id: imageId } });
  }

  // 4. Delete
  async deleteProduct(id: number): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.delete(id);
  }

  // 5. Update
  async updateProduct(
    id: number,
    updateProduct: UpdateProductInterface,
  ): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.update(id, updateProduct);
  }

  // 6. Change Thumbnail
  async changeThumbnail(
    productId: number,
    updateProduct: ChangeThumbnailProductInterface,
  ): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.update(productId, updateProduct);
  }

  // 7. Update Product Image
  async updateProductImage(
    imageId: number,
    updatedProductImage: UpdateProductImageInterface,
  ): Promise<ProductImagesEntity | unknown> {
    return await this.productImagesEntity.update(imageId, updatedProductImage);
  }

  // 8. Update số lượng hàng tồn kho
  async updateQuantityStock(updatedQuantityStock, productId) {
    return await this.productsEntity.update(productId, updatedQuantityStock);
  }

  // // 9. Report Product Comment
  // async reportProductComments(): Promise<ProductsEntity | unknown> {
  //   const query = `
  //   SELECT * FROM product_comments
  //   ORDER BY
  //   `;
  //   return await this.productsEntity.query(query);
  // }
}
