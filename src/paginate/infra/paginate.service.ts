import { Injectable, Logger } from '@nestjs/common';
import { PaginateException } from '../exceptions/paginate.exception';
import { PrismaClient } from '@prisma/client';

export interface PaginateProps {
  module: string;
  busca: string;
  pagina: number;
  itensPorPagina: number;
  queries?: Record<string, any>;
  include?: Record<string, any>;
  buscaPor?: string;
  orderBy?: Record<string, any>;
}

export interface PaginateResponse<T> {
  data: T[];
  maxPag: number;
}

@Injectable()
export class PaginateService<T> {
  private readonly logger = new Logger('PaginateService');

  constructor(private readonly prisma: PrismaClient) {}

  async paginate({
    module,
    busca,
    pagina = 1,
    itensPorPagina = 10,
    queries,
    include,
    buscaPor,
    orderBy,
  }: PaginateProps): Promise<PaginateResponse<T>> {
    try {
      const skip = itensPorPagina * (pagina - 1);
      const query = this.buildQuery({ busca, buscaPor, queries });
      const totalItens = await this.prisma[module].count({ where: query });

      if (totalItens === 0) {
        return { data: [], maxPag: 0 };
      }

      const itens = await this.prisma[module].findMany({
        where: query,
        skip,
        take: itensPorPagina,
        include,
        orderBy,
      });

      const maxPaginas = Math.ceil(totalItens / itensPorPagina);

      return { data: itens, maxPag: maxPaginas };
    } catch (error) {
      this.logger.error('Erro na paginação', error.message);
      throw new PaginateException(error.message);
    }
  }

  private buildQuery({
    busca,
    buscaPor,
    queries,
  }: {
    busca: string;
    buscaPor?: string;
    queries?: Record<string, any>;
  }): Record<string, any> {
    const parametroDeBusca = buscaPor ?? 'nome';
    let query: Record<string, any> = {
      [parametroDeBusca]: {
        contains: busca,
        mode: 'insensitive',
      },
    };

    if (queries) {
      query = { ...query, ...queries };
    }

    return query;
  }
}
