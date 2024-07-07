<?php

declare(strict_types=1);

namespace App\Application\Service;

use App\Application\Request\UserIdRequest;
use App\Application\Request\UserRequest;
use App\Domain\Entity\AddUserEntity;
use App\Domain\Exception\EntityNotFound;
use App\Domain\Repository\UserRepositoryInterface;
use App\Domain\ValueObject\CountryId;
use App\Domain\ValueObject\Date;
use App\Domain\ValueObject\Id;
use App\Domain\ValueObject\Name;

class UserService
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
    ) {
    }

    public function addUser(UserRequest $request): void
    {
        $firstName   = Name::createFromString($request->getFirstName());
        $lastName    = Name::createFromString($request->getLastName());
        $dateOfBirth = Date::createFromString($request->getDateOfBirth());
        $countryId   = CountryId::createFromString($request->getCountryId());

        $userEntity = AddUserEntity::instantiate(
            $firstName,
            $lastName,
            $dateOfBirth,
            $countryId
        );

        //begin transaction
        $this->userRepository->insertUser($userEntity);
        //end transaction
    }

    public function updateUser(UserRequest $request): void
    {
        $firstName   = Name::createFromString($request->getFirstName());
        $lastName    = Name::createFromString($request->getLastName());
        $dateOfBirth = Date::createFromString($request->getDateOfBirth());
        $countryId   = CountryId::createFromString($request->getCountryId());
        $id          = Id::createFromString($request->getId());

        $entity = $this->userRepository->loadEntity($id);

        $entity->updateEntity(
            $firstName,
            $lastName,
            $dateOfBirth,
            $countryId
        );

        //begin transaction
        $this->userRepository->updateUser($entity);
        //end transaction
    }

    public function deleteUser(UserIdRequest $request): void
    {
        $id = Id::createFromInt($request->getUserId());

        //begin transaction
        $this->userRepository->deleteUser($id);
        //end transaction
    }
}