<?php

namespace App\Infrastructure\Dbal\Query;

use App\Application\Query\GetUserDataQueryInterface;
use App\Application\Request\UserIdRequest;
use Doctrine\DBAL\Connection;

class GetUserDataQuery implements GetUserDataQueryInterface
{
    public function __construct(
        private Connection $connection
    ) {}

    public function __invoke(UserIdRequest $request)
    {
        $query = $this->connection->createQueryBuilder();
        $query->select(['*'])
            ->from('users')
            ->where('id = :id')
            ->setParameter('id', $request-> getUserId());

        $result = $query->fetchAssociative();

        if ($result === false) {
            return [];
        }

        return $result;
    }
}