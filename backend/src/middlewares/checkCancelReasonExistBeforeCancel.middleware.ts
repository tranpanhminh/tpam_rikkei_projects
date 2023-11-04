import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { CancelReasonsRepository } from 'src/modules/cancelReasons/cancelReasons.repository';

@Injectable()
export class CheckCancelReasonBeforeCancel implements NestMiddleware {
  constructor(
    private readonly cancelReasonsRepository: CancelReasonsRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const cancelReasonId = req.body.cancel_reason_id;
    const getAllCancelReasons =
      await this.cancelReasonsRepository.getAllCancelReasons();
    const getAll = getAllCancelReasons.map((item) => {
      return item.id;
    });
    if (!getAll.includes(cancelReasonId)) {
      throw new NotFoundException('Invalid Status');
    }

    next();
  }
}
