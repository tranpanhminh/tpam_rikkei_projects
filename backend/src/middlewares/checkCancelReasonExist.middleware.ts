import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { CancelReasonsRepository } from 'src/modules/cancelReasons/cancelReasons.repository';

@Injectable()
export class CheckCancelReasonExist implements NestMiddleware {
  constructor(
    private readonly cancelReasonsRepository: CancelReasonsRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const statusId = req.params.id;
    const getAll = await this.cancelReasonsRepository.getAllCancelReasons();
    const allStatuses = getAll.map((status) => {
      return status.id.toString();
    });
    if (!allStatuses.includes(statusId)) {
      throw new NotFoundException('Cancel Reason ID is not found');
    }

    next();
  }
}
