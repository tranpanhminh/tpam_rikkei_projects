import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesEntity } from './database/entity/services.entity';
import { ServicesInterface } from './interface/services.interface';

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectRepository(ServicesEntity)
    public servicesEntity: Repository<ServicesEntity>,
  ) {}

  // 1. Get All
  async getAllServices() {
    // return await this.servicesEntity.find({
    //   relations: { working_time: true },
    // });

    const query = `
    SELECT
    services.id,
    services.name,
    services.description,
    services.price,
    services.service_image,
    services.working_time_id,
    services.post_type_id,
    services.created_at,
    services.updated_at,
    (
      SELECT JSON_OBJECT("id", working_time.id, "morning_time", working_time.morning_time, "afternoon_time", working_time.afternoon_time)
      FROM working_time
      WHERE working_time.id = services.working_time_id
    ) AS working_time,
    (
      SELECT JSON_OBJECT("id", post_types.id, "name", post_types.name)
      FROM post_types
      WHERE post_types.id = services.post_type_id
    ) AS post_types,
    COALESCE(ROUND(AVG(CASE WHEN COALESCE(users.role_id, 0) NOT IN (1, 2) THEN COALESCE(service_comments.rating, 0) END), 1), 0) AS "avg_rating",
    COUNT(CASE WHEN COALESCE(users.role_id, 0) NOT IN (1, 2) AND service_comments.rating IS NOT NULL THEN 1 ELSE NULL END) AS "total_reviews"
  FROM services
  LEFT JOIN service_comments ON service_comments.post_id = services.id
  LEFT JOIN users ON service_comments.user_id = users.id
  GROUP BY services.id, services.name
  `;
    return await this.servicesEntity.query(query);
  }

  // 2. Get Detail
  async getDetailService(id: number): Promise<ServicesEntity> {
    // const detailService = await this.servicesEntity.findOne({
    //   where: { id: id },
    //   relations: { working_time: true },
    // });
    // return detailService;
    const query = `
    SELECT
    services.id,
    services.name,
    services.description,
    services.price,
    services.service_image,
    services.working_time_id,
    services.post_type_id,
    services.created_at,
    services.updated_at,
    (
      SELECT JSON_OBJECT("id", working_time.id, "morning_time", working_time.morning_time, "afternoon_time", working_time.afternoon_time)
      FROM working_time
      WHERE working_time.id = services.working_time_id
    ) AS working_time,
    (
      SELECT JSON_OBJECT("id", post_types.id, "name", post_types.name)
      FROM post_types
      WHERE post_types.id = services.post_type_id
    ) AS post_types,
    COALESCE(ROUND(AVG(CASE WHEN COALESCE(users.role_id, 0) NOT IN (1, 2) THEN COALESCE(service_comments.rating, 0) END), 1), 0) AS "avg_rating",
    COUNT(CASE WHEN COALESCE(users.role_id, 0) NOT IN (1, 2) AND service_comments.rating IS NOT NULL THEN 1 ELSE NULL END) AS "total_reviews"
  FROM services
  LEFT JOIN service_comments ON service_comments.post_id = services.id
  LEFT JOIN users ON service_comments.user_id = users.id
  WHERE services.id = ${id}
  GROUP BY services.id, services.name
    `;
    const result = await this.servicesEntity.query(query);
    if (result.length > 0) {
      return result[0];
    }
  }

  // 3. Add
  async addService(
    newService: ServicesInterface,
  ): Promise<ServicesEntity | unknown> {
    return await this.servicesEntity.save(newService);
  }

  // 4. Delete
  async deleteService(id: number): Promise<ServicesEntity | unknown> {
    return await this.servicesEntity.delete(id);
  }

  // 5. Update
  async updateService(
    id: number,
    updateService: ServicesInterface,
  ): Promise<ServicesEntity | unknown> {
    return await this.servicesEntity.update(id, updateService);
  }
}
