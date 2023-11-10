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
import { ExportProductsInterface } from './interface/exportProducts.interface';

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
    products.created_at,
    products.updated_at,
    (
      SELECT JSON_OBJECT("id", post_types.id, "name", post_types.name)
      FROM post_types
      WHERE post_types.id = products.post_type_id
    ) AS post_types,
    (
      SELECT JSON_OBJECT("id", vendors.id, "name", vendors.name)
      FROM vendors
      WHERE vendors.id = products.vendor_id
    ) AS vendors,
    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT("id", product_images.id, "image_url", product_images.image_url)
      )
      FROM product_images
      WHERE product_images.product_id = products.id
    ) AS product_images,
    COALESCE(ROUND(AVG(COALESCE(product_comments.rating, 0)), 1), 0) AS "avg_rating",
    COUNT(CASE WHEN product_comments.rating IS NOT NULL THEN 1 ELSE NULL END) AS "total_reviews"
  FROM products
  LEFT JOIN product_comments ON product_comments.post_id = products.id
  LEFT JOIN users ON product_comments.user_id = users.id
  WHERE COALESCE(users.role_id, 0) NOT IN (1, 2)
  GROUP BY products.id, products.name
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
    products.created_at,
    products.updated_at,
    (
      SELECT JSON_OBJECT("id", post_types.id, "name", post_types.name)
      FROM post_types
      WHERE post_types.id = products.post_type_id
    ) AS post_types,
    (
      SELECT JSON_OBJECT("id", vendors.id, "name", vendors.name)
      FROM vendors
      WHERE vendors.id = products.vendor_id
    ) AS vendors,
    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT("id", product_images.id, "image_url", product_images.image_url)
      )
      FROM product_images
      WHERE product_images.product_id = products.id
    ) AS product_images,
    COALESCE(ROUND(AVG(COALESCE(product_comments.rating, 0)), 1), 0) AS "avg_rating",
    COUNT(CASE WHEN product_comments.rating IS NOT NULL THEN 1 ELSE NULL END) AS "total_reviews"
  FROM products
  LEFT JOIN product_comments ON product_comments.post_id = products.id
  LEFT JOIN users ON product_comments.user_id = users.id
  WHERE COALESCE(users.role_id, 0) NOT IN (1, 2) AND products.id = ${id}
  GROUP BY products.id, products.name
  `;
    const result = await this.productsEntity.query(query);
    if (result.length > 0) {
      return result[0];
    }
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

  // 9. Pagination
  async filterPagination(
    page: number,
    limit: number,
  ): Promise<ProductsEntity[] | unknown> {
    const data = await this.getAllProducts();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (startIndex >= data.length) {
      return []; // Không có dữ liệu trang này.
    }

    const paginatedData = data.slice(startIndex, endIndex);
    return paginatedData;
  }

  // 10. SortAndOrder
  async sortAndOrder(sort: string, order: string): Promise<ProductsEntity[]> {
    const data = await this.getAllProducts();
    const allKeys = new Set();

    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        allKeys.add(key);
      });
    });

    const arrayOfKeys = [...allKeys];

    // Kiểm tra xem sort có trong arrayOfKeys không
    if (arrayOfKeys.includes(sort)) {
      const sortedData = [...data]; // Tạo một bản sao của mảng Data

      if (order === 'asc') {
        sortedData.sort((a, b) => {
          if (typeof a[sort] === 'number') {
            return a[sort] - b[sort];
          } else if (typeof a[sort] === 'string') {
            return a[sort].localeCompare(b[sort]);
          }
        });
      } else if (order === 'desc') {
        sortedData.sort((a, b) => {
          if (typeof a[sort] === 'number') {
            return b[sort] - a[sort];
          } else if (typeof a[sort] === 'string') {
            return b[sort].localeCompare(a[sort]);
          }
        });
      }

      return sortedData;
    } else {
      // Trường sort không tồn tại trong arrayOfKeys
      // Trả về mảng ban đầu
      return data;
    }
  }

  // 11. Export File
  async templateCsvProduct(): Promise<ExportProductsInterface[] | any> {
    const data = await this.productsEntity.find({
      relations: {
        product_images: true,
      },
    });
    return data;
  }
}
