<?php

declare(strict_types=1);

namespace App\Infrastructure\Dbal\Query;

use App\Application\Query\DoesUserExistQueryInterface;
use App\Application\Request\UserIdRequest;
use Doctrine\DBAL\Connection;

class DoesUserExistQuery implements DoesUserExistQueryInterface
{
    public function __construct(
        private Connection $connection
    ) {}

    public function __invoke(UserIdRequest $request): bool
    {
        $query = $this->connection->createQueryBuilder();
        $query->select(['1'])
            ->from('users')
            ->where('id = :id')
            ->setParameter('id', $request->getUserId());

        return (bool)$query->fetchOne();
    }
}