<?php

declare(strict_types=1);

namespace App\Infrastructure\Dbal\Repository;

use App\Domain\Entity\AddUserEntity;
use App\Domain\Entity\EditUserEntity;
use App\Domain\Exception\EntityNotFound;
use App\Domain\Repository\UserRepositoryInterface;
use App\Domain\ValueObject\CountryId;
use App\Domain\ValueObject\Date;
use App\Domain\ValueObject\Id;
use App\Domain\ValueObject\Name;
use Doctrine\DBAL\Connection;

class UserRepository implements UserRepositoryInterface
{
    public function __construct(
        private Connection $connection
    ) {
    }

    public function insertUser(AddUserEntity $entity): void
    {
        $userData = $entity->toArray();

        $this->connection->insert('users', [
            'first_name'    => $userData['firstName'],
            'last_name'     => $userData['lastName'],
            'date_of_birth' => $userData['birthDate'],
            'country_id'    => $userData['countryId'],
        ]);
    }

    /**
     * @throws EntityNotFound
     */
    public function loadEntity(Id $id): EditUserEntity
    {
        $query = $this->connection->createQueryBuilder();
        $query->select('*')
            ->from('users')
            ->where('id = :id')
            ->setParameter('id', $id->toInt());

        $result = $query->fetchAssociative();

        if ($result === []) {
            throw new EntityNotFound('Entity not found');
        }

        return EditUserEntity::instantiate(
            Name::createFromString($result['first_name']),
            Name::createFromString($result['last_name']),
            Date::createFromString($result['date_of_birth']),
            CountryId::createFromInt($result['country_id']),
            Id::createFromInt($result['id']),
        );
    }

    public function updateUser(EditUserEntity $entity): void
    {
        $userData = $entity->toArray();

        $this->connection->update(
            'users',
            [
                'first_name'    => $userData['firstName'],
                'last_name'     => $userData['lastName'],
                'date_of_birth' => $userData['birthDate'],
                'country_id'    => $userData['countryId'],
            ],
            ['id' => $userData['id']]
        );
    }

    public function deleteUser(Id $id): void
    {
        $this->connection->delete('users', ['id' => $id->toInt()]);
    }
}