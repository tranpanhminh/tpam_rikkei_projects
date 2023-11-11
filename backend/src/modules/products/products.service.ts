import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsEntity } from './database/entity/products.entity';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductInterface } from './interface/product.interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { AddProductImagesInterface } from './interface/addProductImages.interface';
import { extractPublicId } from 'cloudinary-build-url';
import { ChangeThumbnailProductInterface } from './interface/changeThumbnail.interface';
import { UpdateProductImageInterface } from './interface/updateProductImage.interface';
import { UpdateProductImageDTO } from './dto/updateProductImage.dto';
import { UpdateProductInterface } from './interface/updateProduct.interface';
import { CsvParser } from 'nest-csv-parser';
import { ImportProductsDTO } from './dto/importProducts.dto';
import { ProductImagesRepository } from '../productImages/productImages.repository';
import { Readable } from 'stream';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import * as path from 'path'; // Thêm dòng này
import { ExportProductsInterface } from './interface/exportProducts.interface';
import { join } from 'path';
const cloudinary = require('cloudinary').v2;

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly csvParser: CsvParser,
    private readonly productImagesRepository: ProductImagesRepository,
  ) {}

  // 1. Get All
  async getAllProducts(): Promise<ProductsEntity[]> {
    const result: ProductsEntity[] =
      await this.productsRepository.getAllProducts();
    return result;
  }

  // 2. Get Detail
  async getDetailProduct(id: number): Promise<ProductsEntity | unknown> {
    const detailProduct: ProductsEntity | unknown =
      await this.productsRepository.getDetailProduct(id);
    if (detailProduct) {
      return detailProduct;
    }
  }

  // 3. Add
  async addProduct(
    body: CreateProductDTO,
  ): Promise<ProductsEntity | unknown | any> {
    const { name, description, price, quantity_stock, vendor_id } = body;
    const fileUploaded: any = body.image_url;
    const result = await this.cloudinaryService.uploadFiles(fileUploaded);
    const newProduct: ProductInterface = {
      name: name,
      description: description,
      price: Number(price),
      quantity_stock: Number(quantity_stock),
      thumbnail_url: result[0].secure_url,
      vendor_id: vendor_id,
      post_type_id: 1,
    };
    const addProduct: any =
      await this.productsRepository.addProduct(newProduct);
    for (let i = 0; i < result.length; i++) {
      const imagesInfo: AddProductImagesInterface = {
        product_id: addProduct.id,
        image_url: result[i].secure_url,
      };
      await this.productsRepository.uploadProductImages(imagesInfo);
    }

    return new HttpException('Product Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteProduct(id: number): Promise<ProductsEntity | unknown> {
    const checkProduct = await this.productsRepository.getDetailProduct(id);
    if (checkProduct) {
      const listImages = checkProduct.product_images.map((item) => {
        return extractPublicId(item.image_url);
      });
      await cloudinary.api.delete_resources(listImages);
      await this.productsRepository.deleteProduct(id);
      return new HttpException('Product Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updateProduct(
    id: number,
    body: UpdateProductDTO,
  ): Promise<ProductsEntity | unknown | any> {
    const { name, description, price, quantity_stock, vendor_id } = body;
    const checkProduct = await this.productsRepository.getDetailProduct(id);
    if (checkProduct) {
      const updatedProduct: UpdateProductInterface = {
        name: !name ? checkProduct.name : name,
        description: !description ? checkProduct.description : description,
        price: !price ? Number(checkProduct.price) : Number(price),
        quantity_stock: !quantity_stock
          ? Number(checkProduct.quantity_stock)
          : Number(quantity_stock),
        vendor_id: !vendor_id
          ? Number(checkProduct.vendor_id)
          : Number(vendor_id),
      };

      await this.productsRepository.updateProduct(id, updatedProduct);
      return new HttpException('Product Updated', HttpStatus.OK);
    }
  }

  // 6. Change Thumbnail
  async changeThumbnail(
    productId: number,
    imageId: number,
  ): Promise<ProductsEntity | unknown | any> {
    const findImage =
      await this.productsRepository.getDetailProductImage(imageId);
    const checkProduct =
      await this.productsRepository.getDetailProduct(productId);
    if (checkProduct) {
      const updatedProductInfo: ChangeThumbnailProductInterface = {
        thumbnail_url: findImage.image_url,
      };
      await this.productsRepository.changeThumbnail(
        productId,
        updatedProductInfo,
      );
      return new HttpException('Product Thumbnail Updated', HttpStatus.OK);
    }
  }

  // 7. Update Product Image
  async updateProductImage(
    productId: number,
    imageId: number,
    body: UpdateProductImageDTO,
  ): Promise<ProductsEntity | unknown | any> {
    const fileImage: any = body.image_url;
    const uploadFile = await this.cloudinaryService.uploadFile(fileImage);
    await this.productsRepository.getDetailProduct(productId);

    // Lấy lại ảnh cũ
    let getOldImageUrl = '';
    const findImage =
      await this.productsRepository.getDetailProductImage(imageId);
    if (findImage) {
      getOldImageUrl = findImage.image_url;
      const updatedProductImage: UpdateProductImageInterface = {
        image_url: uploadFile.secure_url,
      };
      await this.productsRepository.updateProductImage(
        imageId,
        updatedProductImage,
      );

      // Xóa ảnh cũ
      const publicId = extractPublicId(getOldImageUrl);
      await cloudinary.api.delete_resources(publicId);
      return new HttpException('Product Image Updated', HttpStatus.OK);
    }
  }

  // 8. Report Comments
  async filterPagination(
    page: number,
    limit: number,
  ): Promise<ProductsEntity[] | unknown> {
    const result = await this.productsRepository.filterPagination(page, limit);
    return result;
  }

  // 8. Report Comments
  async sortAndOrder(
    sort: string,
    order: string,
  ): Promise<ProductsEntity[] | unknown> {
    const result = await this.productsRepository.sortAndOrder(sort, order);
    return result;
  }

  async importProducts(body): Promise<ImportProductsDTO[] | unknown | any> {
    const { file } = body;
    const fileBuffer = Buffer.from(file.buffer);
    const stream = Readable.from(fileBuffer);
    const importedData: ImportProductsDTO[] = [];
    const parser = parse({
      columns: true, // Cho phép sử dụng tên cột trong dòng tiêu đề
      delimiter: ',', // Đặt ký tự phân cách
    });
    stream.pipe(parser);

    // const processRecords = async () => {
    //   for await (const record of parser) {
    //     // Here, you can transform the data into your desired format
    //     const info: any = {
    //       name: record['name'],
    //       description: record['description'],
    //       price: record['price'],
    //       quantity_stock: record['quantity_stock'],
    //       thumbnail_url: record['thumbnail_url'],
    //       vendor_id: record['vendor_id'],
    //       post_type_id: 1,
    //     };

    //     // You can now use the 'info' object to save data to your database, etc.
    //     console.log(info, 'Product');

    //     importedData.push(info);

    //     // Lưu thông tin sản phẩm vào bảng products
    //     const newProduct: any = await this.productsRepository.addProduct(info);

    //     // Lưu URL hình ảnh vào bảng product_images
    //     for (let i = 1; i <= 4; i++) {
    //       const imageUrl = record[`image_url${i}`];
    //       if (imageUrl) {
    //         const imageInfo = {
    //           product_id: newProduct.id,
    //           image_url: imageUrl,
    //         };
    //         console.log(imageInfo, 'product');
    //         await this.productsRepository.uploadProductImages(imageInfo);
    //       }
    //     }
    //     // }
    //   }
    //   return importedData; // Ensure that importedData is returned
    // };

    // stream.on('end', async () => {
    //   try {
    //     const data = await processRecords();
    //     // Now, 'data' will contain the imported data
    //     console.log(data);
    //   } catch (error) {
    //     console.error('Error processing records:', error);
    //   }
    // });

    // parser.on('data', async (stream) => {
    //   importedData.push(stream);
    //   console.log(importedData, '----');

    //   for (const product of importedData) {
    //     console.log(product, 'AAAAAAAA');
    //     const info = {
    //       name: product['name'],
    //       description: product['description'],
    //       price: product['price'],
    //       quantity_stock: product['quantity_stock'],
    //       thumbnail_url: product['thumbnail_url'],
    //       vendor_id: product['vendor_id'],
    //       post_type_id: 1,
    //     };

    //     console.log(info, 'Product');
    //     // Lưu thông tin sản phẩm vào bảng products
    //     const newProduct: any = await this.productsRepository.addProduct(info);

    //     // Lưu URL hình ảnh vào bảng product_images
    //     for (let i = 1; i <= 4; i++) {
    //       const imageUrl = product[`image_url${i}`];
    //       if (imageUrl) {
    //         const imageInfo = {
    //           product_id: newProduct.id,
    //           image_url: imageUrl,
    //         };
    //         console.log(imageInfo, 'product');
    //         await this.productsRepository.uploadProductImages(imageUrl);
    //       }
    //     }
    //   }
    // });

    new Promise((resolve, reject) => {
      parser.on('data', (data) => {
        importedData.push(data);
      });
      parser.on('end', async () => {
        resolve(importedData);
        for (const data of importedData) {
          const info = {
            name: data.name,
            description: data.description,
            price: data.price,
            quantity_stock: data.quantity_stock,
            thumbnail_url: data.thumbnail_url,
            vendor_id: data.vendor_id,
            post_type_id: 1,
          };
          // Lưu thông tin sản phẩm vào bảng products
          const newProduct: any =
            await this.productsRepository.addProduct(info);

          // Lưu URL hình ảnh vào bảng product_images
          for (let i = 1; i <= 4; i++) {
            const imageUrl = data[`image_url${i}`];
            if (imageUrl) {
              const imageInfo = {
                product_id: newProduct.id,
                image_url: imageUrl,
              };
              await this.productsRepository.uploadProductImages(imageInfo);
            }
          }
        }
      });

      parser.on('error', (error) => {
        reject(error);
      });
    });
    return new HttpException('Products Imported Successfully', HttpStatus.OK);
  }

  async exportProducts(res): Promise<any> {
    const templateExportProduct: any[] =
      await this.productsRepository.templateCsvProduct();
    const newData = [];
    for (const data of templateExportProduct) {
      const item: ExportProductsInterface = {
        id: data.id,
        name: data.name,
        quantity_stock: data.quantity_stock,
        price: data.price,
        description: data.description,
        thumbnail_url: data.thumbnail_url,
        vendor_id: data.vendor_id,
        image_url1: data.product_images[0].image_url,
        image_url2: data.product_images[1].image_url,
        image_url3: data.product_images[2].image_url,
        image_url4: data.product_images[3].image_url,
      };
      newData.push(item);
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1;
    const dd = today.getDate();
    const formattedDate = `${yyyy}_${dd}_${mm}`;
    const fileName = `data_products_exports_${formattedDate}.csv`;
    const exportPath = 'public/files/export';
    if (!fs.existsSync(exportPath)) {
      fs.mkdirSync(exportPath, { recursive: true });
    }
    const csvStream = fastcsv.format({ headers: true });
    const writableStream = fs.createWriteStream(`${exportPath}/${fileName}`);

    // Ghi dữ liệu vào stream CSV
    newData.forEach((data) => {
      csvStream.write(data);
    });
    csvStream.pipe(writableStream);
    csvStream.end();
    writableStream.on('finish', async () => {
      const file = path.resolve(process.cwd(), exportPath, fileName);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      // fs.createReadStream(file).pipe(res); // hoặc dùng cái này thay cái dưới
      
      // res.download(file, fileName, () => {
      //   fs.unlinkSync(writableStream.path); // Xóa file sau khi tải xuống
      // });
      // Thành đoạn mã sau
      const relativePath = `public/files/export/${fileName}`;
      res.download(relativePath, fileName, () => {
        fs.unlinkSync(writableStream.path); // Xóa file sau khi tải xuống
      });
    });
  }
}
