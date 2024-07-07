<?php

declare(strict_types=1);

namespace App\Infrastructure\Dbal\Query;

use App\Application\Query\GetUsersByDatesQueryInterface;
use App\Application\Request\DatesRequest;
use App\Application\Response\CountOfUsersByCountryResponse;
use Doctrine\DBAL\Connection;

class GetUsersByDatesQuery implements GetUsersByDatesQueryInterface
{
    public function __construct(
        private Connection $connection
    ) {}

    public function __invoke(DatesRequest $request): ?CountOfUsersByCountryResponse
    {
        $users = $this->getListOfUsersByDates($request);

        if ($users === []) {
            return null;
        }

        $countOfUsersByCountry = $this->getCountOfUsersByCountry($request);

        return new CountOfUsersByCountryResponse(
            $users,
            $countOfUsersByCountry
        );
    }

    private function getListOfUsersByDates(DatesRequest $request): array
    {
        $query = $this->connection->createQueryBuilder();
        $query->select(['u.id', 'u.date_of_birth', "CONCAT (u.first_name, ' ', u.last_name) as name" , 'c.name as country'])
            ->from('users', 'u')
            ->innerJoin('u', 'countries', 'c', 'u.country_id = c.id')
        ;

        if ($request->getDateFrom() !== null) {
            $query->andWhere('u.date_of_birth >= :date_from');
            $query->setParameter('date_from', $request->getDateFrom());
        }

        if ($request->getDateTo() !== null) {
            $query->andWhere('u.date_of_birth <= :date_to');
            $query->setParameter('date_to', $request->getDateTo());
        }

        return $query->fetchAllAssociative();
    }

    private function getCountOfUsersByCountry(DatesRequest $request): array
    {
        $query = $this->connection->createQueryBuilder();
        $query->select(['c.name', 'count(u.id) as value'])
            ->from('countries', 'c')
            ->innerJoin('c', 'users', 'u', 'u.country_id = c.id')
            ->groupBy('c.id');

        if ($request->getDateFrom() !== null) {
            $query->andWhere('u.date_of_birth >= :date_from');
            $query->setParameter('date_from', $request->getDateFrom());
        }

        if ($request->getDateTo() !== null) {
            $query->andWhere('u.date_of_birth <= :date_to');
            $query->setParameter('date_to', $request->getDateTo());
        }

        return $query->fetchAllAssociative();
    }
}