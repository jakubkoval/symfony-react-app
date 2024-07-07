<?php

declare(strict_types=1);

namespace App\Domain\Repository;

use App\Domain\Entity\AddUserEntity;
use App\Domain\Entity\EditUserEntity;
use App\Domain\Exception\EntityNotFound;
use App\Domain\ValueObject\Id;

interface UserRepositoryInterface
{
    public function insertUser(AddUserEntity $entity): void;
    /**
     * @throws EntityNotFound
     */
    public function loadEntity(Id $id): EditUserEntity;
    public function updateUser(EditUserEntity $entity): void;
    public function deleteUser(Id $id): void;
}