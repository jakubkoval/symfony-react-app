<?php

namespace App\Infrastructure\Dbal\Query;

use App\Application\Query\GetListOfCountriesQueryInterface;
use Doctrine\DBAL\Connection;

class GetListOfCountriesQuery implements GetListOfCountriesQueryInterface
{
    public function __construct(
        private Connection $connection
    ) {}

    public function __invoke(): array
    {
        $query = $this->connection->createQueryBuilder();
        $query->select(['*'])
            ->from('countries');

        return $query->fetchAllAssociative();
    }
}