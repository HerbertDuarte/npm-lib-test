import { Module } from '@nestjs/common';
import { PaginateService } from './paginate.service';

@Module({
  providers: [PaginateService],
  imports: [],
})
export class PaginateModule {}
